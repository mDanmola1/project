# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.attendance_page, name='attendance_page'),
    path('api/attendance/', views.save_students, name='save_students'),
]
