#VIEWS.PY
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import ItemBorrowSerializers, ItemReturnSerializers,ItemUnreturnSerializers,UnreturnToReturnSerializers
from .models import ItemBorrow, ItemReturn,ItemUnreturn,UnreturnToReturn


class ItemBorrowViewSet(viewsets.ModelViewSet):
    queryset = ItemBorrow.objects.all()
    serializer_class = ItemBorrowSerializers

    def perform_create(self, serializer):
        instance = serializer.save()

class ItemUnreturnViewSet(viewsets.ModelViewSet):
    queryset = ItemUnreturn.objects.all()
    serializer_class = ItemUnreturnSerializers

    def perform_create(self, serializer):
        instance = serializer.save()
        item_borrow_instance = instance.unreturn_item
        #it deletes the corresponding ItemBorrow instance
        item_borrow_instance.delete()

class UnreturnToReturnViewSet(viewsets.ModelViewSet):
    queryset = UnreturnToReturn.objects.all()
    serializer_class = UnreturnToReturnSerializers
    
class ItemReturnViewSet(viewsets.ModelViewSet):
    queryset = ItemReturn.objects.all()
    serializer_class = ItemReturnSerializers

    def perform_create(self, serializer):
        instance = serializer.save()
        item_borrow_instance = instance.return_item
        #it deletes the corresponding ItemBorrow instance
        item_borrow_instance.delete()

