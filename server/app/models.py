from django.db import models

# Create your models here.

class UserProfile(models.Model):
    avatar = models.ImageField(null=True, blank=True)
class User(models.Model):
    username = models.CharField(max_length=255)
    password = models.TextField()
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.username

class Room(models.Model):
    name = models.CharField(max_length=255)

    private = models.BooleanField()

    def __str__(self):
        return self.name

class AttendeeData(models.Model):
    x = models.FloatField()
    y = models.FloatField()

    direction = models.FloatField()

    class Meta:
        verbose_name_plural = 'user in room data'
class Attendee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

    data = models.ForeignKey(AttendeeData, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user} in {self.room.name}'
    class Meta:
        verbose_name_plural = 'users in rooms'
