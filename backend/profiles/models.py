from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin, UserManager
from django.utils import timezone
from multiselectfield import MultiSelectField
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError



# models.py
# Create your models here.
# for data tables

# manage database queries and operations for a specific model.

class CustomUserManager(UserManager): # Custom manager for the user model    

    def _create_user(self, email, password=None, **extra_fields):
        # Private method to create a user
        if not email:
            raise ValueError('An email is required.')
        
        # if has email, it will Normalize the email (convert to lowercase)
        email = self.normalize_email(email)
         
        # Create a new user instance with the provided email and additional fields
        user = self.model(email=email, **extra_fields)
        
        # Set the password for the user
        user.set_password(password)
        
        # Save the user to the database
        user.save(using=self._db)

        return user

    def create_user(self, email=None, password=None, **extra_fields): 
        # Public method to create a regular user(students,teachers[not sure tho])
        
        # Set default values for is_staff and is_superuser
        extra_fields.setdefault('is_staff', False) 
        extra_fields.setdefault('is_superuser', False)
        
        # Call the private method to handle user creation
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        # Public method to create a superuser (admin user)
        
        # Set default values for is_staff and is_superuser
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        # Call the private method to handle superuser creation
        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    idNumber = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=200, unique=True)
    contact = models.CharField(max_length=50, default='', blank=True)
    department = models.CharField(max_length=255, default='', blank=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', default='public/default.png',blank=True)
    # date_joined = models.DateTimeField(default=timezone.now,blank=True)
    # position = models.CharField(max_length=255,default='student',blank=True) # added - automated as student 


    is_staff = models.BooleanField(default=False) #

    objects = CustomUserManager() # Instance of the CustomUserManager class, which was defined in your previous code.
                                  # This manager provides methods for creating users and superusers.

    USERNAME_FIELD = 'email' # indicating that the email field is used for authentication 
                             # instead of the default username
    REQUIRED_FIELDS = [] # indicating that no additional fields are required during user creation

    # class Meta:
    #     ordering = ['-date_joined']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Staff(models.Model):
    POSITION_DEPARTMENT_CHAIR = 'Department Chair'
    POSITION_ADMIN_ASSOCIATE = 'Admin Associate'
    POSITION_CHOICES = [
        ('Department Chair', 'Department Chair'),
        ('Admin Associate', 'Admin Associate'),
        ('Full-Time Faculty', 'Full-Time Faculty'),
        ('Part-Time Faculty', 'Part-Time Faculty')
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    position = models.CharField(max_length=300, choices=POSITION_CHOICES)

    class Meta:
        verbose_name_plural = "PE Department Members"

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    def save(self, *args, **kwargs):
        # Ensure only one director and exists at a time
        if self.position in [self.POSITION_DEPARTMENT_CHAIR, self.POSITION_ADMIN_ASSOCIATE]:
            Staff.objects.filter(position__in=[self.POSITION_DEPARTMENT_CHAIR, self.POSITION_ADMIN_ASSOCIATE, ...]).exclude(user=self.user).delete()
        super().save(*args, **kwargs)

class PEChoice(models.Model):
    professor = models.ForeignKey(Staff,on_delete=models.CASCADE)
    choice = models.CharField(max_length=255) #admin
    students = models.ManyToManyField(User, related_name='pe_choices')

    def __str__(self):
        return self.choice

    #If the position is set as 'Director', it ensures that only one director exists at a time by deleting any other 
    #staff members with the position 'Director' (excluding the current one) before saving the new instance.
    # def save(self, *args,**kwargs):
    #     if self.position in [self.POSITION_DEPARTMENT_CHAIR, self.POSITION_ADMIN_ASSOCIATE]:
    #         Staff.objects.filter(position__in=[self.POSITION_DEPARTMENT_CHAIR, self.POSITION_ADMIN_ASSOCIATE]).exclude(user=self.user).delete()
    #     super().save(*args, **kwargs)
    # Staff.object - maintain consistency and ensure that only one 
    #staff member holds the positions 'Department Chair' or 'Admin Associate' at a time

# PE_CATEGORIES = {
    #     'PE1': {'Boxing': ['16-244', '16-245', '16-247'], 'Taekwando': ['16-244', '16-245', '16-247'],
    #             'Exercises': ['16-244', '16-245', '16-247']},
    #     'PE2': {'Dance': ['16-244', '16-245', '16-247']},
    #     'PE3': {'Basketball': ['16-244', '16-245', '16-247'], 'Volleyball': ['16-248', '16-249', '16-250']},
    #     'PE4': {'Table Tennis': ['16-244', '16-245', '16-247'], 'Badminton': ['16-244', '16-245', '16-247']}
    # }