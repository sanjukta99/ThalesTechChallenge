from django.urls import path, include
from .views import CreateAirportListView, AirportListView, GetAirportByICAOView, GetSIDSbyICAO, GetSTARsbyICAO, GetSIDsJSON, GetSTARsJSON, CreateSIDsSlackNotification, CreateSTARsSlackNotification

urlpatterns = [
    path('create-airport-list', CreateAirportListView.as_view()),
    path('airport-list', AirportListView.as_view()),
    path('get-airport', GetAirportByICAOView.as_view()),
    path('get-sids-icao', GetSIDSbyICAO.as_view()),
    path('get-stars-icao', GetSTARsbyICAO.as_view()),
    path('get-sids-json', GetSIDsJSON.as_view()),
    path('get-stars-json', GetSTARsJSON.as_view()),
    path('sids-slack-notif', CreateSIDsSlackNotification.as_view()),
    path('stars-slack-notif', CreateSTARsSlackNotification.as_view())
]