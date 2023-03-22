from rest_framework import serializers, fields

from .models import *

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('name', 'private')
class AttendeeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendeeData
        fields = ('x', 'y', 'direction')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('avatar',)
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
        model = User
        fields = ('username', 'id', 'profile')

class AttendeeSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    room = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all())
    data = AttendeeDataSerializer()

    class Meta:
        model = Attendee
        fields = '__all__'
