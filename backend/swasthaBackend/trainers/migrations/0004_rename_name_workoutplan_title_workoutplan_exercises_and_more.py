# Generated by Django 4.2.4 on 2023-09-03 17:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('trainers', '0003_workoutplan_nutritionplan'),
    ]

    operations = [
        migrations.RenameField(
            model_name='workoutplan',
            old_name='name',
            new_name='title',
        ),
        migrations.AddField(
            model_name='workoutplan',
            name='exercises',
            field=models.TextField(default='Default exercises', help_text='List of exercises separated by commas'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workoutplan',
            name='reps_per_set',
            field=models.PositiveIntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workoutplan',
            name='rest_interval',
            field=models.CharField(default='Default rest_interval', help_text='Time in seconds or minutes', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workoutplan',
            name='sets',
            field=models.PositiveIntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='workoutplan',
            name='trainer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workouts', to='trainers.trainerprofile'),
        ),
    ]
