from django.db import models
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    username = models.CharField(max_length=25, unique=True)
    password = models.CharField(max_length=25)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10)