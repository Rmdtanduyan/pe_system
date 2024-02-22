#urls.py
from .import views
from rest_framework import routers
from django.urls import path,include

router = routers.DefaultRouter()
router.register('User',views.UserViewSet, basename='User') #naa sa views.py Class TodoViewSet()
router.register('Staffs/Faculties',views.StaffViewSet, basename='Staffs/Faculties') 
router.register('Class Codes',views.ClassCodesViewSet, basename='Class Codes')
router.register('Class List',views.ClassListViewSet, basename='Class List')  
# router.register(r'profile',views.UserInfoViewSet) #para isa lang makita sa api instaead of 2 routers
# dili mapasa ang json file sa backend kung kini imong gamiton
urlpatterns = [
    path('api/', include(router.urls)),
    
    # # other urlpatterns if any
]
urlpatterns += router.urls #used to extend the router register in the url patterns
