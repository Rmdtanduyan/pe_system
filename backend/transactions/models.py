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

class ItemUnreturn(models.Model):
    unreturn_item = models.OneToOneField(ItemBorrow, on_delete=models.SET_NULL, related_name='item_unreturn', null=True)

class UnreturnToReturn(models.Model):
    unreturn_item_to_return = models.ForeignKey(ItemUnreturn, on_delete=models.SET_NULL, related_name='item_return', null=True)

class ItemReturn(models.Model):
    return_item = models.ForeignKey(ItemBorrow, on_delete=models.SET_NULL, related_name='item_return', null=True)
    date_returned = models.DateTimeField(auto_now_add=True)
