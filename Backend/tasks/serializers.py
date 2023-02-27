from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import *

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'username', 'email', 'password']
        extra_kwargs = {'password':{'write_only':True}}


    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(RegisterSerializer, self).create(validated_data)

class TaskSerializer(serializers.ModelSerializer):
    owner=serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Task
        fields = ['id','title','completed','owner']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token