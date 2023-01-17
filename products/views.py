from django.shortcuts import render
from .serializers import ProductSerializer
from .models import Product
from rest_framework import viewsets 
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class ProductMVS(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = self.perform_create(serializer)
        data = {
            "message": f"Product {product.name} saved successfully",
            "product" : serializer.data
            }
        headers = self.get_success_headers(serializer.data)
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        product = serializer.save()
        product.seller_id = self.request.user.id
        product.save()
        return product
    
    
# class FavoritesMVS(viewsets.ModelViewSet):
#     queryset = Favorites.objects.all()
#     serializer_class = FavoritesSerializer
    
    
# class CardMVS(viewsets.ModelViewSet):
#     queryset = Card.objects.all()
#     serializer_class = CardSerializer