#SERIALIZERS.PY
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError  # Corrected import
from .models import ItemBorrow, ItemReturn # Assuming your models are correctly defined


class ItemBorrowSerializers(serializers.ModelSerializer):
     class Meta:
        model = ItemBorrow
        fields = '__all__'
class ItemReturnSerializers(serializers.ModelSerializer):
     class Meta:
        model = ItemReturn
        fields = '__all__'
