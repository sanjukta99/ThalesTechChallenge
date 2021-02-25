from django.db import models

# Create your models here.
class Airport(models.Model):
    uid = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    icao = models.CharField(max_length=50)
    latitude = models.FloatField()
    longitude = models.FloatField()
    altitude = models.FloatField()

