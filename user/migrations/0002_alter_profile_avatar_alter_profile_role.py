# Generated by Django 4.1.5 on 2023-01-17 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(default='users/avatar.png', upload_to='users'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='role',
            field=models.PositiveIntegerField(blank=True, choices=[(1, 'SELLER'), (2, 'CUSTOMER')], null=True),
        ),
    ]
