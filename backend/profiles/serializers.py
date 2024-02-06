# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.serializers import ValidationError
from . import models

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer): #for signup
    class Meta:
        model = UserModel
        fields = ['idNumber', 'first_name', 'last_name', 'email']

    def create(self, data):
        user = UserModel.objects.create_user(
            idNumber = data['idNumber'],
            email = data['email'],
            first_name = data['first_name'],
            last_name = data['last_name'],
            is_staff=False  # Set the is_staff field
        )
        return user

class UserLoginSerializer(serializers.Serializer): #for login
    email = serializers.EmailField()

    def check_user(self, data):
        try:
            user = UserModel.objects.get(email=data['email'])
        except UserModel.DoesNotExist:
            raise ValidationError('User not found')
        return user
    

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Staff
        fields = '__all__'
class UserSerializer(serializers.ModelSerializer):
    # staff = StaffSerializer() - ask about kay andrew
    class Meta:
        model = UserModel
        exclude = ['password','department','bio'] #walay apil sa json
        
class PEChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PEChoice
        fields = '__all__'
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.User
#         fields = '__all__'
# class StaffSerializer(serializers.ModelSerializer):
#     staff = UserSerializer()

#     class Meta:
#         model = models.Staff
#         fields = '__all__'
    