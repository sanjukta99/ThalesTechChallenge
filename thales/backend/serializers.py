from rest_framework import serializers
from .models import Airport


class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = ('id', 'uid', 'name', 'icao', 'latitude', 'longitude', 'altitude')

class CreateAirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = ('uid', 'name', 'icao', 'latitude', 'longitude', 'altitude')