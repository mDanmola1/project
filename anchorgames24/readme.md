Anchor Games
Anchor Games is an e-commerce platform for buying and selling trading cards, board games, and video games.

Features
User registration and login
JWT-based authentication
Role-based access control for admin functions 
Add, view, and remove items from the cart **** CART FUNCTIONS WILL NOT WORK WITH THIS ITERATION
Search and filter products 
Secure endpoints using Passport.js
Installation
Prerequisites
Ensure you have the following installed on your machine: 

Node.js
MongoDB
Libraries
The following libraries are used in this project:

express: Web framework for Node.js
mongoose: MongoDB object modeling tool
passport: Authentication middleware for Node.js
passport-jwt: Passport strategy for authenticating with a JSON Web Token
bcryptjs: Library for hashing passwords
jsonwebtoken: JSON Web Token implementation
method-override: Middleware for overriding HTTP methods
body-parser: Node.js body parsing middleware
dotenv: Loads environment variables from a .env file into process.env
hbs: Handlebars view engine for Express
Setup
1. 
Clone the repository:
```
git clone https://github.com/mDanmola1/anchorgames.git
cd anchorgames
```
2. 
Install dependencies
```
npm install
```
3. 
Create a .env file in the root directory and add the following:
```
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/anchorgames
```
4. 
Run MongoDB
```
mongod
```
5. 
Run the app
```
npm start
```
