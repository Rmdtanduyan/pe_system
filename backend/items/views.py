#VIEWS.PY
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ItemTagSerializers
from .models import ItemTag
from rest_framework import viewsets, permissions, status, filters

# Create your views here.

class ItemTagViewSet(viewsets.ModelViewSet):
    queryset = ItemTag.objects.all()
    serializer_class = ItemTagSerializers

    filter_backends = [filters.SearchFilter]
    search_fields = ['item_id', 'item_name','category','condition']
