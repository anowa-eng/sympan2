from rest_framework import serializers, fields

from .models import *

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('name', 'private')
class UserInRoomDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInRoomData
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

class UserInRoomSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    room = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all())
    data = UserInRoomDataSerializer()

    class Meta:
        model = UserInRoom
        fields = '__all__'
