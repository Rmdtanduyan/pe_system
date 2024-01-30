#admin.py
from django.contrib import admin
from .models import User, Subjects

# Register your models here.
admin.site.register(User) #naa sa models.py Class pe_system()   
admin.site.register(Subjects)
