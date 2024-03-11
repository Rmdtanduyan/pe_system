from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError  # Corrected import
from .models import Staff, ClassCodes, ClassList  # Assuming your models are correctly defined

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['first_name', 'last_name', 'email']

    def create(self, validated_data):
        user = UserModel.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_staff=False
        )
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def check_user(self, data):
        try:
            user = UserModel.objects.get(email=data['email'])
        except UserModel.DoesNotExist:
            raise ValidationError('User not found')
        return user

class CreateStaffSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Staff
        fields = '__all__'
        extra_kwargs = {'position': {'required': False}}

class StaffSerializer(serializers.ModelSerializer):
    # Assuming you need to create a staff member and link a user at the same time
    # This pattern needs a corresponding view logic to properly handle nested writes


    class Meta:
        model = Staff
        fields = '__all__'
        extra_kwargs = {'position': {'required': False}}
# Assuming you want to show user info in Staff details
class UserSerializer(serializers.ModelSerializer):
    # This is how you'd nest a StaffSerializer within a UserSerializer if needed
    # Ensure your User model has a related name to staff or adjust accordingly
    staff = StaffSerializer(read_only=True)

    class Meta:
        model = UserModel
        exclude = ['password']

class StaffSerializer(serializers.ModelSerializer):
    # Assuming you need to create a staff member and link a user at the same time
    # This pattern needs a corresponding view logic to properly handle nested writes
    user = UserSerializer()

    class Meta:
        model = Staff
        fields = '__all__'
        extra_kwargs = {'position': {'required': False}}

class ClassCodesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassCodes
        fields = '__all__'

class ClassListSerializer(serializers.ModelSerializer):
    professor = StaffSerializer(read_only=True)
    classcodes = ClassCodesSerializer(read_only=True)
    students = UserSerializer(many=True,read_only=True)
    
    class Meta:
        model = ClassList
        fields = '__all__'

class CreateClassListSerializer(serializers.ModelSerializer):

    class Meta:
        model = ClassList
        fields = '__all__'