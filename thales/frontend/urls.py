from django.urls import path
from .views import index
urlpatterns = [
    path('', index),
    path('airport-list', index),
    path('airport/<str:icao>', index),
    path('json', index)
]
