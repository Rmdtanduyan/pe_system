from django.db import models

from django.db import models
# models.py
# Create your models here.
# for data tables

class item_tag(models.Model): #for tagging
    item_name = models.CharField(max_length=20)
    category = models.CharField(max_length=20)
    quantity = models.IntegerField() 
    tag_date = models.DateTimeField(auto_now_add=True)


