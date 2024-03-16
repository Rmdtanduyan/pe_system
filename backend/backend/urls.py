# backend/urls.py
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include('profiles.urls')), #urls.py sa todo folder
    path("item/", include('items.urls'))
]
