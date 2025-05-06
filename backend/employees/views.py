from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import (MultiPartParser, FormParser)
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ClaimFormSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

class CreateClaimView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated] 
    parser_classes = [FormParser, MultiPartParser] 

    def post(self, request, format=None):
        serializer = ClaimFormSerializer(data=request.data, context={'user': request.user})

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=201)
        else:
            return Response(data=serializer.errors, status=400)