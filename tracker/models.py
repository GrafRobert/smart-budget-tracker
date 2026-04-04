from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):

    CATEGORY_TYPES = (
        ('income', 'Income'),
        ('expense','Expense'),
    )

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=10, choices=CATEGORY_TYPES)
    
    def __str__(self):
        return f"{self.name} ({self.type})"


class Transaction(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=255)
    date = models.DateField()

    def __str__(self):
        return f"{self.amount} pe {self.date} - {self.description}"