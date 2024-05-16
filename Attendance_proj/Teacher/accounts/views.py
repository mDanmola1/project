from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .serializers import UserCreateSerializer
from django.shortcuts import redirect, render

from rest_framework.decorators import api_view

def login_user(request):
    if request.method == 'POST':
        print("POST request received")  # Debug statement
        username = request.POST.get('username')
        password = request.POST.get('password')
        print("Username:", username)  # Debug statement
        print("Password:", password)  # Debug statement


        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            print("User logged in successfully:", user.username)
            return redirect('attendance_page')  # Redirect to a success URL after login
        else:
            return render(request, 'accounts/login.html', {'error': 'Invalid credentials'})

    return render(request, 'accounts/login.html')

@api_view(['POST'])
def register_user(request):
    serializer = UserCreateSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user:
            # Redirect to a success URL after registration
            return redirect('attendance_page')
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_user(request):
    logout(request)
    return redirect('login_user') 
