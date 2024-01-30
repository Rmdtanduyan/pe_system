from django.db import models
# models.py
# Create your models here.
# for data tables


class User(models.Model):    
    POSITION_CHOICES = [('students','students'),('professor','professor'),('director','director')]

    idNumber = models.IntegerField()
    sub = models.CharField(max_length=100)
    name = models.CharField(max_length=255) 
    email = models.EmailField()
    position = models.CharField(max_length=255,choices=POSITION_CHOICES,default='student')

class Subjects(models.Model):
    prof = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    class_codes = models.CharField(max_length=255)


Rmdtanduyan