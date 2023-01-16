from rest_framework.generics import CreateAPIView
from .models import MyUser
from .serializers import RegisterUserSerializer
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

class RegisterView(CreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = RegisterUserSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        active_user = self.perform_create(serializer)
        active_user["token"] = Token.objects.get(user = active_user).key
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()
    
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     user = serializer.save()
    #     token = Token.objects.get(user=user)
    #     data = serializer.data
    #     data["key"] = token.key
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(data, status=status.HTTP_201_CREATED, headers=headers)