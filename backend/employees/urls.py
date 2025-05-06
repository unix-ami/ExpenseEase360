from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from .views import CreateClaimView

urlpatterns = [
    path('claims/', CreateClaimView.as_view(), name='claim-create'), 
]

