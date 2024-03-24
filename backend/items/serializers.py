from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError  # Corrected import
from .models import ItemTag # Assuming your models are correctly defined


class ItemTagSerializers(serializers.ModelSerializer):
     class Meta:
        model = ItemTag
        fields = '__all__'
