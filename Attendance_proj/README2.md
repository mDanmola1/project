
User authentication and account creation using Django Rest Framework (DRF). We'll create a Django app named `accounts` to handle user-related functionality like registration, login, and logout

1. **Define User Model**:
In the `models.py` file of the `accounts` app, we define a custom user model `CustomUser` which extends Django's built-in `AbstractUser`. We add custom fields like first name, last name, and email to the user model.

2. **Serializers**:
We create serializers using DRF's `ModelSerializer` to convert model instances into JSON format for API communication. We have two serializers: `UserSerializer` to serialize user data, and `UserCreateSerializer` to handle user registration.

3. **Views**:
We define views using DRF's `@api_view` decorator to handle user authentication and account creation. We have three views:
- `register_user`: Handles user registration and creates a new user in the database.
- `login_user`: Handles user login and generates a token for authentication.
- `logout_user`: Handles user logout and invalidates the session.

4. **URLs**:
We define URL patterns in the `urls.py` file of the `accounts` app to map views to endpoints. We have three URLs:
- `/register/`: Endpoint for user registration.
- `/login/`: Endpoint for user login.
- `/logout/`: Endpoint for user logout.

#### Running the Application

To run the application, make sure you have Django and Django Rest Framework installed. Then, follow these steps:

1. Run the Django development server:
