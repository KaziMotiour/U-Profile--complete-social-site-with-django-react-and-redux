# Generated by Django 3.1.5 on 2021-01-16 12:26

import UserPost.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserPost', '0005_auto_20210116_0408'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userpost',
            name='image',
            field=models.ImageField(blank=True, upload_to=UserPost.models.upload_to),
        ),
    ]