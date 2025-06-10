# backend/billing/views.py
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views import View
from .models import Customer, Transaction, CreditBalance
import stripe
import json

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated



stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def create_checkout_session(request):
    if request.method != "POST":
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    # Example: always 100 credits for $10
    price_per_credit = 0.10
    credits_to_buy = 100
    amount_cents = int(credits_to_buy * price_per_credit * 100)

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {'name': f'{credits_to_buy} Credits'},
                    'unit_amount': amount_cents,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=settings.FRONTEND_SUCCESS_URL,
            cancel_url=settings.FRONTEND_CANCEL_URL,
        )
        return JsonResponse({'id': session.id, 'url': session.url})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    if request.method != "POST" or not sig_header:
        return JsonResponse({'error': 'Invalid request'}, status=400)

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        stripe_customer_id = session.get('customer')
        payment_intent = session.get('payment_intent')
        amount_paid = int(session['amount_total']) / 100

        # Link to user if available, otherwise just Stripe customer
        customer, _ = Customer.objects.get_or_create(
            stripe_customer_id=stripe_customer_id,
        )
        # Create a transaction record
        Transaction.objects.create(
            customer=customer,
            stripe_payment_intent=payment_intent,
            amount=amount_paid,
            status='completed',
        )
        # Add credits (e.g., 100 per payment)
        credits, _ = CreditBalance.objects.get_or_create(customer=customer)
        credits.credits += 100
        credits.save()

    return JsonResponse({'status': 'success'})


@method_decorator(login_required, name='dispatch')
class CreditBalanceView(View):
    def get(self, request):
        user = request.user
        try:
            customer = Customer.objects.get(user=user)
            credits = CreditBalance.objects.get(customer=customer).credits
        except (Customer.DoesNotExist, CreditBalance.DoesNotExist):
            credits = 0
        return JsonResponse({'credits': credits})
    
@login_required
def get_user_credits(request):
    user = request.user
    credits = 0
    try:
        customer = Customer.objects.get(user=user)
        credits = CreditBalance.objects.get(customer=customer).credits
    except (Customer.DoesNotExist, CreditBalance.DoesNotExist):
        credits = 0
    return JsonResponse({'credits': credits})

class CreateStripeCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Price and credits can be dynamic
        credits_to_buy = int(request.data.get("credits", 10))
        price_cents = 500 * credits_to_buy // 10  # Example: 10 credits = $5.00

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "unit_amount": price_cents,
                        "product_data": {
                            "name": f"{credits_to_buy} Credits (Clipoforge AI)"
                        },
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            customer_email=request.user.email,
            success_url=settings.FRONTEND_SUCCESS_URL,
            cancel_url=settings.FRONTEND_CANCEL_URL,
            metadata={"user_id": str(request.user.id), "credits": credits_to_buy},
        )
        return Response({"checkout_url": session.url})


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
    event = None
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except (ValueError, stripe.error.SignatureVerificationError):
        return HttpResponse(status=400)

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        user_id = session["metadata"]["user_id"]
        credits = int(session["metadata"]["credits"])
        from users.models import CustomUser
        user = CustomUser.objects.get(id=user_id)
        user.credits += credits
        user.save()
    return HttpResponse(status=200)
