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
        
        # Create UnreturnToReturn instance with data from ItemUnreturn
        unreturn_to_return_data = {
            'unreturn_item_to_return': instance  # using the 'instance' variable here
        }
        unreturn_to_return_serializer = UnreturnToReturnSerializers(data=unreturn_to_return_data)
        if unreturn_to_return_serializer.is_valid():
            unreturn_to_return_serializer.save()
        else:
            # Handle serializer errors if any
            return Response(unreturn_to_return_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Delete the ItemUnreturn instance
        instance.delete()

        return Response("Data transferred successfully.", status=status.HTTP_200_OK)
class UnreturnToReturnViewSet(viewsets.ModelViewSet):
    queryset = UnreturnToReturn.objects.all()
    serializer_class = UnreturnToReturnSerializers
    
    def perform_create(self, serializer):
        instance = serializer.save()
        item_unreturn_instance = instance.unreturn_item_to_return
        #it deletes the corresponding ItemBorrow instance
        item_unreturn_instance.delete()

class ItemReturnViewSet(viewsets.ModelViewSet):
    queryset = ItemReturn.objects.all()
    serializer_class = ItemReturnSerializers

    def perform_create(self, serializer):
        instance = serializer.save()
        item_borrow_instance = instance.return_item
        #it deletes the corresponding ItemBorrow instance
        item_borrow_instance.delete()

