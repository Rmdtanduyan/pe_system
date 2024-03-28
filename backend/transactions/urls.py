#URLS/PY
from .import views
from rest_framework import routers
from django.urls import path,include

router = routers.DefaultRouter()
router.register('ITEM_BORROW', views.ItemBorrowViewSet, basename='Itemborrow')
router.register('ITEM_UNRETURN', views.ItemUnreturnViewSet, basename='Itemunreturn')
router.register('UNRETURN_TO_RETURN', views.UnreturnToReturnViewSet, basename='UnreturnToReturn')
router.register('ITEM_RETURN', views.ItemReturnViewSet, basename='Itemreturn')

urlpatterns = [
    path('', include(router.urls)),
]
