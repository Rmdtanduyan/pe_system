# models.py
from django.db import models
from profiles.models import User
from items.models import ItemTag

class ItemBorrow(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    borrow_item = models.OneToOneField(ItemTag, on_delete=models.CASCADE)
    date_borrowed = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Name borrower: {self.user}  ||   Item borrowed: {self.borrow_item}"

class ItemReturn(models.Model):
    return_item  = models.OneToOneField(ItemBorrow, on_delete=models.CASCADE, related_name='item_return')
    date_returned = models.DateTimeField(auto_now_add=True)
