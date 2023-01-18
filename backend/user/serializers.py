from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from dj_rest_auth.serializers import TokenSerializer
from .models import Profile
from products.serializers import ProductSerializer
from products.models import Product

class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        required=True,
        write_only=True,
        validators=[validate_password]
    )
    password2 = serializers.CharField(
        required=True,
        write_only=True,
        validators=[validate_password]
    )
    email = serializers.CharField(
        required=True,
        validators=[UniqueValidator]
    )
    class Meta:
        model = User
        fields = ("username", "email", "first_name", "last_name", "password", "password2" )
        
    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError(
                {"password" : "Didn't match"}
            )
        return data
    
    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.get("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")
        
class CustomTokenSerializer(TokenSerializer):
    user = UserTokenSerializer(read_only=True)
    
    class Meta(TokenSerializer.Meta):
        fields = ("user", "key")

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    user_id = serializers.IntegerField(required=False)
    favorites = ProductSerializer(many=True, read_only=True)
    cards = ProductSerializer(many=True, read_only=True)
    sold_products = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ("id", "user", "user_id", "avatar", "bio", "favorites", "cards")
        
#! buradaki ProfileSerializer'ın kullanıldığı view (ProfileUpdateView)
#! RetrieveUpdateAPIView'dan inherit edildiği için create metodu değil update metodu override edilmeli,        
    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        instance.user_id = self.context['request'].user.id
        instance.save()
        return instance
    
    def get_sold_products(self, instance):
        products = Product.objects.all()
        product = products.filter(seller_id=instance.user_id)
        return ProductSerializer(product, many=True).data