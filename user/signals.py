from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from .models import MyUser


#! yeni bir user oluşturulduğunda ona token oluşturması için receiver dekoratoru ile yazılan metod;
#! bu bize register olduktan sonra tekrar login sayfasına gitmeden login olmamızı sağlıyor.

#? post_save , yani işlem/olay  bittikten sonra, yani user create edildikten sonra
#? sender=User, User tablosundan yeni user create edilince singnal gönder ve bunu reciver dekaratoru ile yakala
@receiver(post_save, sender=MyUser)
def create_Token(sender, instance=None, created=False, **kwargs):
  #* created = False, eğer token oluşumuş ise True olur,
  #* yani if created demek if True ise demektir,
  if created:
    Token.objects.create(user=instance)