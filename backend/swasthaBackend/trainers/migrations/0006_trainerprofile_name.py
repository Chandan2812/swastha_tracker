# Generated by Django 4.2.4 on 2023-09-05 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trainers', '0005_nutritionplan_daily_carbs_nutritionplan_daily_fats_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='trainerprofile',
            name='name',
            field=models.CharField(default='Default name', max_length=255),
            preserve_default=False,
        ),
    ]
