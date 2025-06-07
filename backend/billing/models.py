from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    stripe_customer_id = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"{self.user} ({self.stripe_customer_id})"

class Transaction(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    stripe_payment_intent = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer} - {self.amount} USD - {self.status}"

class CreditBalance(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE)
    credits = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.customer}: {self.credits} credits"
