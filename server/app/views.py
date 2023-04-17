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
    try:
        room_object = Room.objects.get(pk=current_room)
        room_user_data = room_object.attendee_set.all()
        serialized_data = list(map(
            lambda room_user: AttendeeSerializer(room_user).data,
            room_user_data
        ))
        return JsonResponse({'data': serialized_data})
    except Exception as e:
        return JsonResponse({'error': str(e)})
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
