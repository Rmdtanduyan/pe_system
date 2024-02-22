#admin.py
from django.contrib import admin
from .models import User, Staff,ClassCodes,ClassList

# Register your models here.
admin.site.register(User) #naa sa models.py Class pe_system()   
admin.site.register(Staff)
admin.site.register(ClassCodes)
admin.site.register(ClassList)