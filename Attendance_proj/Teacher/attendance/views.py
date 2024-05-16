from rest_framework import status, viewsets
from rest_framework.response import Response
from django.shortcuts import render
from .models import Attendance
from .serializers import AttendanceSerializer
from django.http import JsonResponse


def attendance_page(request):
    return render(request, 'attendance/attendance.html')

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

def save_students(request):
    if request.method == 'POST':
        # Process the POST data and save it to the database
        # Example: Save attendance data from request.body
        # Replace this with your actual implementation
        data = request.POST.get('students')
        # Save the data to the database
        return JsonResponse({'message': 'Students saved successfully'})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)