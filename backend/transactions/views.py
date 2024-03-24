#VIEWS.PY

from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import ItemBorrowSerializers, ItemReturnSerializers
from .models import ItemBorrow, ItemReturn

class ItemBorrowViewSet(viewsets.ModelViewSet):
    queryset = ItemBorrow.objects.all()
    serializer_class = ItemBorrowSerializers

    def perform_create(self, serializer):
        instance = serializer.save()
        # You may add any additional logic here upon item borrowing

class ItemReturnViewSet(viewsets.ModelViewSet):
    queryset = ItemReturn.objects.all()
    serializer_class = ItemReturnSerializers

    def perform_create(self, serializer):
        instance = serializer.save()
        item_borrow_instance = instance.return_item
        # Here, you can delete the corresponding ItemBorrow instance if needed
        item_borrow_instance.delete()

