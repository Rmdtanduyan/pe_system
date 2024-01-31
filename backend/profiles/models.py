from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin, UserManager
from django.utils import timezone

# models.py
# Create your models here.
# for data tables

class CustomUserManager(UserManager):
    def _create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('An email is required.')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)
class User(AbstractBaseUser, PermissionsMixin):
    idNumber = models.CharField(max_length=255,blank=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=200, unique=True)
    contact = models.CharField(max_length=50, default='', blank=True)
    department = models.CharField(max_length=255, default='', blank=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', default='public/default.png',blank=True)
    date_joined = models.DateTimeField(default=timezone.now,blank=True)
    position = models.CharField(max_length=255,default='student') #automated as student


    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ['-date_joined']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    

class Subjects(models.Model): #director
    CODES_CHOICES = [()]
    prof = models.ForeignKey(User,on_delete=models.CASCADE)
    class_codes = models.CharField(max_length=255)

