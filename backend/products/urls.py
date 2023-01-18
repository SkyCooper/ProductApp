from django.urls import path
from .views import ProductMVS
from rest_framework import routers

router = routers.DefaultRouter()
router.register("", ProductMVS)


urlpatterns = [
    
]
urlpatterns += router.urls