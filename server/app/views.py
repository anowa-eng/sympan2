from django.shortcuts import render

from django.http import JsonResponse, HttpResponse

from .models import *
from .serializers import *

import json

# Create your views here.
def index_view(req):
    req.session['current_room'] = 1

    return render(req, 'index.html')

def current_room(req):
    current_room = req.session.get('current_room')
    return HttpResponse(current_room if current_room else '')
def get_initial_room_data(req):
    current_room = req.session.get('current_room')

    room_object_list = Room.objects.filter(pk=current_room)
    if room_object_list:
        room_object = room_object_list[0]

        room_users = UserInRoom.objects.filter(room=room_object)
        user_positions = list(map(
            lambda room_user: room_user.data,
            room_users
        ))

        # Create initial data dictionary
        initial_data = []
        for room_user in room_users:
            def user_matches_position(user_position):
                user_in_room = user_position.userinroom_set.all()[0]
                user_instance = room_user.user

                return user_in_room.user == user_instance
            user_position = list(filter(
                lambda room_user: user_matches_position(room_user),
                user_positions
            ))[0]
            user_id = room_user.user.id

            user_in_room_data_serializer = UserInRoomDataSerializer(user_position)
            user_in_room_dict = user_in_room_data_serializer.data

            user_data = {
                'data': {
                    'position': {
                        'x': user_in_room_dict['x'],
                        'y': user_in_room_dict['y']
                    },
                    'direction': user_in_room_dict['direction']
                },
                'user_id': user_id
            }
            initial_data.append(user_data)
    else:
        initial_data = []

    return JsonResponse({'data': initial_data})
def load_users(request):
    ids = request.GET.get('ids').split(',')
    users = User.objects.filter(pk__in=ids)
    user_data = list(map(
        lambda user: UserSerializer(user).data,
        users
    ))
    def safe_user_map_function(user):
        user_profile = UserProfile.objects.filter(user_id=user['id'])
        return {
            **user,
            'profile': UserProfileSerializer(user_profile[0]).data
        } if user_profile else user
    user_data_with_profiles = list(map(
        safe_user_map_function,
        user_data
    ))
    return JsonResponse({ 'data': user_data_with_profiles })
