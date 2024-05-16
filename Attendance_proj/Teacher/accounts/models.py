# accounts/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    
    #id = models.AutoField(primary_key=True)
    
    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        verbose_name='user permissions',
    )
