from django.db import models

# Create your models here.
# models.py

class Attendance(models.Model):
    student_name = models.CharField(max_length=100)
    student_id = models.CharField(max_length=100)
    date = models.DateField()
    present = models.BooleanField(default=False)
    email = models.EmailField(default='')  # New field for email
    phone_number = models.CharField(max_length=20)  # New field for phone number
    time = models.CharField(max_length=10)  # New field for time, you might want to adjust the length based on your requirements

    def __str__(self):
        return f"{self.student_name} - {self.date}"

