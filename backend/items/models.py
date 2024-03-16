from django.db import models
# models.py
# Create your models here.
# for data tables

class ItemTag(models.Model): #for tagging

    CATEGORY_CHOICES = [
        ('Basketball', 'Basketball'),
        ('Badminton', 'Badminton'),
        ('Volleyball', 'Volleyball'),
    ]
    item_id = models.IntegerField()
    item_name = models.CharField(max_length=20)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    tag_date = models.DateTimeField(auto_now_add=True)
    #status either true or false (borrowed, returned, unreturned)

    def __str__(self):
        return self.item_id
class ItemBorrow(models.Model):
    #user
    item = models.OneToOneField(ItemTag, on_delete=models.CASCADE, primary_key=True)
    date_borrowed = models.DateTimeField(auto_now_add=True)
    time_borrowed = models.TimeField(auto_now_add=True)

class ItemReturn(models.Model):
    #user
    item_borrow = models.ForeignKey(ItemBorrow,on_delete=models.CASCADE)
    date_return = models.DateTimeField(auto_now_add=True)
    time_return = models.TimeField(auto_now_add=True)

class ItemUnreturn(models.Model):
    #user
    item_borrow = models.ForeignKey(ItemBorrow,on_delete=models.CASCADE)
