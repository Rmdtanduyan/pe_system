#URLS/PY
from .import views
from rest_framework import routers
from django.urls import path,include

router = routers.DefaultRouter()
router.register('Itemborrow', views.ItemBorrowViewSet, basename='Itemborrow')
router.register('Itemreturn', views.ItemReturnViewSet, basename='Itemreturn')

urlpatterns = [
    path('', include(router.urls)),
]
