from rest_framework import serializers
from .models import Claim

class ClaimFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = ['claim_type', 'amount', 'image']  # include fields you want to expose

    def create(self, validated_data):
        user = self.context.get('user') 
        claim = Claim.objects.create(user=user, **validated_data)
        return claim
