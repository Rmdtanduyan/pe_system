# models.py
from django.db import models
import profiles.models

class ItemTag(models.Model): #for tagging

    CATEGORY_CHOICES = [
        ('Basketball', 'Basketball'),
        ('Badminton', 'Badminton'),
        ('Volleyball', 'Volleyball'),
    ]
    CONDITION_CHOICES = [
        ('Good', 'Good'),
        ('Damaged', 'Damaged'),
    ]

    item_id = models.IntegerField()
    item_name = models.CharField(max_length=20)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES, default='Good')
    tag_date = models.DateTimeField(auto_now_add=True)
    #status either true or false (borrowed, returned, unreturned)

    def __str__(self):
        # Convert item_id to string for the __str__ method
        return f"{self.item_name}  ({self.category})"