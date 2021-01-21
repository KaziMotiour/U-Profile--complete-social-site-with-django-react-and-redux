# Generated by Django 3.1.5 on 2021-01-20 09:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('UserPost', '0008_auto_20210119_0307'),
        ('authentication', '0001_initial'),
        ('user_profile', '0017_auto_20210116_1926'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Notification_type', models.IntegerField(choices=[(1, 'like'), (2, 'comment'), (3, 'follow')])),
                ('text_preview', models.CharField(blank=True, max_length=90)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('is_seen', models.BooleanField(default=False)),
                ('post', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='postNotification', to='UserPost.userpost')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notif_from_user', to='authentication.newusers')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notif_to_user', to='authentication.newusers')),
            ],
        ),
    ]
