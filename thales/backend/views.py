from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
import requests
from .models import Airport
from .serializers import AirportSerializer
import json
from heapq import nlargest

# Create your views here.

class AirportListView(generics.ListAPIView):
    queryset = Airport.objects.all()
    if len(queryset) > 0:
        serializer_class = AirportSerializer
    else:
        url = "https://127.0.0.1:8000/api/create-airport-list"
        response = requests.get(url)
        queryset = Airport.objects.all()
        serializer_class = AirportSerializer

class CreateAirportListView(APIView):
    url = "https://open-atms.airlab.aero/api/v1/airac/airports"
    headers = {
        "api-key" : "lgBaEkJ1TLQrwFDhtwe2mqLWIgoiyxue9kmrNkvOKpdjfhyXHIcdw7MNLmTLopH6"
    }
    response = requests.get(url, headers=headers)
    for obj in response.json():
        uid = obj['uid']
        name = obj['name']
        icao = obj['icao']
        latitude = obj['lat']
        longitude = obj['lng']
        altitude = obj['alt']
        queryset = Airport.objects.filter(uid=uid)
        if queryset.exists():
            pass
        else:
            airport = Airport(uid=uid, name=name, icao=icao, latitude=latitude, longitude=longitude, altitude=altitude)
            airport.save()

class GetAirportByICAOView(APIView):
    serializer_class = AirportSerializer
    lookup_url_kwarg = 'icao'

    def get(self, request, format=None):
        icao = request.GET.get(self.lookup_url_kwarg)
        if id != None:
            airport = Airport.objects.filter(icao=icao)
            if len(airport) > 0:
                data = AirportSerializer(airport[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Airport Not Found': 'Invalid ICAO'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request' : 'ICAO parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class GetSIDSbyICAO(APIView):
    lookup_url_kwarg = 'icao'

    def get(self, request, format=None):
        icao = request.GET.get(self.lookup_url_kwarg)
        if icao != None:
            url = "https://open-atms.airlab.aero/api/v1/airac/sids/airport/{}".format(icao)
            headers = {
                "api-key" : "lgBaEkJ1TLQrwFDhtwe2mqLWIgoiyxue9kmrNkvOKpdjfhyXHIcdw7MNLmTLopH6"
            }
            response = requests.get(url, headers=headers)
            sids = []
            for obj in response.json():
                sidObj = {}
                sidObj['name'] = obj['name']
                sids.append(sidObj)
            return Response(sids, status=status.HTTP_200_OK)
        return Response({'SID Not Found': 'Invalid ICAO'}, status=status.HTTP_404_NOT_FOUND)

class GetSTARsbyICAO(APIView):
    lookup_url_kwarg = 'icao'

    def get(self, request, format=None):
        icao = request.GET.get(self.lookup_url_kwarg)
        if icao != None:
            url = "https://open-atms.airlab.aero/api/v1/airac/stars/airport/{}".format(icao)
            headers = {
                "api-key" : "lgBaEkJ1TLQrwFDhtwe2mqLWIgoiyxue9kmrNkvOKpdjfhyXHIcdw7MNLmTLopH6"
            }
            response = requests.get(url, headers=headers)
            stars = []
            for obj in response.json():
                starObj = {}
                starObj['name'] = obj['name']
                stars.append(starObj)
            return Response(stars, status=status.HTTP_200_OK)
        return Response({'STAR Not Found': 'Invalid ICAO'}, status=status.HTTP_404_NOT_FOUND)
                
class GetSIDsJSON(APIView):

    def get(self, request, format=None):
        finalobj = []
        url = "https://open-atms.airlab.aero/api/v1/airac/airports"
        headers = {
            "api-key" : "lgBaEkJ1TLQrwFDhtwe2mqLWIgoiyxue9kmrNkvOKpdjfhyXHIcdw7MNLmTLopH6"
        }
        response = requests.get(url, headers=headers)

        for obj in response.json():
            airportobj = {}
            airportobj['airport'] = obj['icao']
            urlsid = "https://open-atms.airlab.aero/api/v1/airac/sids/airport/{}".format(obj['icao'])
            responsesid = requests.get(urlsid, headers=headers)
            count = {}
            for obj in responsesid.json():
                for wp in obj['waypoints']:
                    if wp['name'] in count:
                        count[wp['name']] = count[wp['name']] + 1
                    else:
                        count[wp['name']] = 1
            two_largest = nlargest(2, count, key=count.get)
            topWaypoints = []
            for i in two_largest:
                wp = {}
                wp['name'] = i
                wp['count'] = count[i]
                topWaypoints.append(wp)
            airportobj['topWaypoints'] = topWaypoints
            finalobj.append(airportobj)
        return Response(finalobj, status=status.HTTP_200_OK)

class GetSTARsJSON(APIView):

    def get(self, request, format=None):
        finalobj = []
        url = "https://open-atms.airlab.aero/api/v1/airac/airports"
        headers = {
            "api-key" : "lgBaEkJ1TLQrwFDhtwe2mqLWIgoiyxue9kmrNkvOKpdjfhyXHIcdw7MNLmTLopH6"
        }
        response = requests.get(url, headers=headers)

        for obj in response.json():
            airportobj = {}
            airportobj['airport'] = obj['icao']
            urlsid = "https://open-atms.airlab.aero/api/v1/airac/stars/airport/{}".format(obj['icao'])
            responsesid = requests.get(urlsid, headers=headers)
            count = {}
            for obj in responsesid.json():
                for wp in obj['waypoints']:
                    if wp['name'] in count:
                        count[wp['name']] = count[wp['name']] + 1
                    else:
                        count[wp['name']] = 1
            two_largest = nlargest(2, count, key=count.get)
            topWaypoints = []
            for i in two_largest:
                wp = {}
                wp['name'] = i
                wp['count'] = count[i]
                topWaypoints.append(wp)
            airportobj['topWaypoints'] = topWaypoints
            finalobj.append(airportobj)
        return Response(finalobj, status=status.HTTP_200_OK)

    
# SLACK BOT VIEWS
class CreateSIDsSlackNotification(APIView):

    def post(self, request, format=None):
        webhook_url = "https://hooks.slack.com/services/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"
        message_title = "Statistics for *SIDs*:"
        message_body = "```" + json.dumps(request.data, indent=4) + "```"
        message = message_title + message_body
        slack_message = {'text': message}
        response = requests.post(webhook_url, data=json.dumps(slack_message, indent=4))
        return Response(response, status=status.HTTP_201_CREATED)
    
class CreateSTARsSlackNotification(APIView):

    def post(self, request, format=None):
        webhook_url = "https://hooks.slack.com/services/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"
        message_title = "Statistics for *STARs*:"
        message_body = "```" + json.dumps(request.data, indent=4) + "```"
        message = message_title + message_body
        slack_message = {'text': message}
        response = requests.post(webhook_url, data=json.dumps(slack_message, indent=4))
        return Response(response, status=status.HTTP_201_CREATED)