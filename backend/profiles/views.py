#views.py
from django.contrib.auth import login, logout
from rest_framework import viewsets, permissions, status, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from . import serializers
from . import models

from .serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    UserSerializer,
    CreateStaffSerializer,
    StaffSerializer
)
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()
   
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name']
    

    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.create(request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def checkregister(self, request):
        email = request.data.get('email', None)
        user_exists = models.User.objects.filter(email=email).exists()
        print(f"Checking registration for email: {email}")
        print(f"User exists: {user_exists}")
        if user_exists:
            return Response({'detail': 'User already registered'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'User not registered'}, status=status.HTTP_202_ACCEPTED)   
            
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.check_user(request.data)
        token, created = Token.objects.get_or_create(user=user)
        login(request, user)
        return Response({'user': serializer.data, 'token': token.key}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        if request.user.is_authenticated:
            try:
                token = Token.objects.get(user=request.user)
                token.delete()
            except Token.DoesNotExist:
                pass
            logout(request)
            return Response({'detail': 'Logout successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def get_logged_in_user_details(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    
class StaffViewSet(viewsets.ModelViewSet):
    queryset = models.Staff.objects.all()
    serializer_class = serializers.StaffSerializer
    def get_serializer_class(self):
            if self.action == 'create':
                return CreateStaffSerializer
            return StaffSerializer
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

class ClassCodesViewSet(viewsets.ModelViewSet):# Specify the base class (e.g., ModelViewSet)
    queryset = models.ClassCodes.objects.all() #models.py class Todo(models.Model)
    serializer_class = serializers.ClassCodesSerializer #import sa serilaizers.py class TodoSerializers()

    filter_backends = [filters.SearchFilter]
    search_fields = ['classcode', 'time_start','time_end', 'day_sched']
class ClassListViewSet(viewsets.ModelViewSet):# Specify the base class (e.g., ModelViewSet)
    queryset = models.ClassList.objects.all() #models.py class Todo(models.Model)
    serializer_class = serializers.ClassListSerializer #import sa serilaizers.py class TodoSerializers()
    queryset = models.ClassList.objects.all()