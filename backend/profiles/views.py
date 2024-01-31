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
)
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):# Specify the base class (e.g., ModelViewSet)
    queryset = models.User.objects.all() #models.py class Todo(models.Model)
    serializer_class = serializers.UserSerializer #import sa serilaizers.py class TodoSerializers()

    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.create(request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def checkregister(self, request):
        email = request.data.get('email', None)
        user_exists = models.User.objects.filter(email=email).exists()

        if user_exists:
            return Response({'detail': 'User already registered'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'User not registered'}, status=status.HTTP_200_OK)   
            
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


class SubjectsViewSet(viewsets.ModelViewSet):# Specify the base class (e.g., ModelViewSet)
    queryset = models.Subjects.objects.all() #models.py class Todo(models.Model)
    serializer_class = serializers.SubjectsSerializer #import sa serilaizers.py class TodoSerializers()

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.SubjectsCreateSerializer
        return serializers.SubjectsSerializer