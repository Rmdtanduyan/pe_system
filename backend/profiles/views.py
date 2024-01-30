#views.py
from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):# Specify the base class (e.g., ModelViewSet)
    queryset = models.User.objects.all() #models.py class Todo(models.Model)
    serializer_class = serializers.UserSerializer #import sa serilaizers.py class TodoSerializers()

class SubjectsViewSet(viewsets.ModelViewSet):# Specify the base class (e.g., ModelViewSet)
    queryset = models.Subjects.objects.all() #models.py class Todo(models.Model)
    serializer_class = serializers.SubjectsSerializer #import sa serilaizers.py class TodoSerializers()