# Generated by Django 3.1.5 on 2021-03-08 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserPost', '0008_auto_20210119_0307'),
    ]

    operations = [
        migrations.AddField(
            model_name='userpost',
            name='privacy',
            field=models.CharField(blank=True, choices=[('public', 'public'), ('freind', 'freind'), ('onlyme', 'onlyme')], default='freind', max_length=20, null=True),
        ),
    ]
