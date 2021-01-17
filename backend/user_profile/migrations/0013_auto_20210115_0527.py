# Generated by Django 3.1.5 on 2021-01-15 13:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
        ('user_profile', '0012_auto_20210115_0521'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_profile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to='authentication.newusers'),
        ),
    ]