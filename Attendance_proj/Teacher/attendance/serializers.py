from attendance.models import Attendance
from rest_framework import serializers


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['id', 'date', 'present', 'student_name', 'student_id', 'email', 'phone_number', 'time']
