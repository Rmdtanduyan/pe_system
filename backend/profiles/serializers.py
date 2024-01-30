# serializers.py
from rest_framework import serializers
from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Subjects
        fields = '__all__'
class SubjectsSerializer(serializers.ModelSerializer):
    #forkey = UserProfileSerializer() # check difference pag i delete nimo na ni 
    class Meta:
        fields = '__all__'