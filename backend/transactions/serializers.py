#SERIALIZERS.PY
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError  # Corrected import
from .models import ItemBorrow, ItemReturn,ItemUnreturn,UnreturnToReturn # Assuming your models are correctly defined
from profiles.serializers import UserSerializer
from items.serializers import ItemTagSerializers

class ItemBorrowSerializers(serializers.ModelSerializer):
   class Meta:
        model = ItemBorrow
        fields = '__all__'
class ItemReturnSerializers(serializers.ModelSerializer):
     class Meta:
        model = ItemReturn
        fields = '__all__'
class UnreturnToReturnSerializers(serializers.ModelSerializer):
     class Meta:
        model =UnreturnToReturn
        fields = '__all__'
class ItemUnreturnSerializers(serializers.ModelSerializer):
     class Meta:
        model = ItemUnreturn
        fields = '__all__'
