# Generated by Django 4.2.9 on 2024-01-30 11:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idNumber', models.IntegerField()),
                ('sub', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('position', models.CharField(choices=[('students', 'students'), ('professor', 'professor'), ('director', 'director')], default='student', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Subjects',
            fields=[
                ('prof', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='profiles.user')),
                ('class_codes', models.CharField(max_length=255)),
            ],
        ),
    ]
