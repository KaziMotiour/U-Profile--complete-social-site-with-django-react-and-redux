# Generated by Django 3.1.5 on 2021-01-14 15:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
        ('user_profile', '0007_auto_20210114_0740'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userfollow',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='follow', to='authentication.newusers'),
        ),
    ]