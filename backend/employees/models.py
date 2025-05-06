from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
import os

def get_upload_path(instance, filename):
    return os.path.join('evidence', filename)

# Enum-like choices for ExpenseClaimType and Department
class ClaimType(models.TextChoices):
    TRAVEL = 'Travel', 'Travel'
    FOOD = 'Food', 'Food'
    ACCOMMODATION = 'Accommodation', 'Accommodation'
    SUPPLIES = 'Supplies', 'Supplies'
    EQUIPMENT = 'Equipment', 'Equipment'
    TRAINING = 'Training', 'Training'
    TECH = 'Tech', 'Tech'
    HEALTHCARE = 'Healthcare', 'Healthcare'
    MAINTENANCE = 'Maintenance', 'Maintenance'
    CLIENT = 'Client', 'Client'
    OTHER = 'Other', 'Other' 

class UploadType(models.TextChoices):
    BILL = 'Bill', 'Bill'
    DOCUMENATION = 'Documenatation', 'Documenatation'
    GOODS = 'Goods', 'Goods'
    TICKET = 'Tickets', 'Tickets'

class Claim(models.Model):
    # User who uploaded the claim (linked to the custom user model)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='claims')  # User can have many claims
    
    # Expense Claim Type (using ExpenseClClaimTypeaimType enum defined earlier)
    claim_type = models.CharField(
        max_length=50,
        choices=ClaimType.choices,
        default=ClaimType.FOOD,  # Default to 'Travel'
    )

    # Amount of the claim (stored as a Decimal field, never negative)
    amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(0)]  # Ensure amount is never negative
    )

    # Image field to upload a photo related to the claim
    image = models.ImageField(upload_to=get_upload_path, blank=False)

    #  Upload Type (using UploadType enum defined earlier)
    upload_type = models.CharField(
        max_length=50,
        choices=UploadType.choices,
        default=UploadType.BILL,  # Default to 'Bill'
    )

    # The date and time when the claim is uploaded
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}'s photo at {self.uploaded_at}"

