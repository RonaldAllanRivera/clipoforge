from django.urls import path
from . import views
from .views import CreateStripeCheckoutSession, stripe_webhook



urlpatterns = [
    path('create_checkout_session/', views.create_checkout_session, name='create_checkout_session'),
    path('stripe_webhook/', views.stripe_webhook, name='stripe_webhook'),
    path('my_credits/', views.get_user_credits, name='get_user_credits'), 
    path("api/create-stripe-session/", CreateStripeCheckoutSession.as_view(), name="create_stripe_session"),
    path("api/stripe/webhook/", stripe_webhook, name="stripe_webhook"),
]
