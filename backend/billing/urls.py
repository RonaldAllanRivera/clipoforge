from django.urls import path
from . import views

urlpatterns = [
    path('create_checkout_session/', views.create_checkout_session, name='create_checkout_session'),
    path('stripe_webhook/', views.stripe_webhook, name='stripe_webhook'),
    path('my_credits/', views.get_user_credits, name='get_user_credits'),  # Add this

]