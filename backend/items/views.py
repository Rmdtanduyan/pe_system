from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ItemTagSerializers
from .models import ItemTag
# Create your views here.

class ItemTagViewSet(viewsets.ModelViewSet):
    queryset = ItemTag.objects.all()
    serializer_class = ItemTagSerializers
