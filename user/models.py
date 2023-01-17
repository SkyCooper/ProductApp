from django.db import models
from django.contrib.auth.models import User
from products.models import Product, Favorites, Card

ROLE = (
  (1, "SELLER"),
  (2, "CUSTOMER"),
)
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.PositiveIntegerField(choices=ROLE, blank=True, null=True)
    favorites = models.ForeignKey(Favorites, on_delete=models.CASCADE, blank=True, null=True)
    cards = models.ForeignKey(Card, on_delete=models.CASCADE, blank=True, null=True)
    sell_product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    display_name = models.CharField(max_length=30, blank=True, null=True)
    avatar = models.ImageField(upload_to="users", default="users/avatar.png")
    bio = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile'"
    
# self.user.username --> Profile modelindeki user field üzerinden, 1to1 bağlı olduğu User modeline ulaşılır,
# ulaşılan User modelinden'de username çekilebilir.