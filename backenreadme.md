
# User Registration and Authentication API

This project is a fullstack application built with **Express.js**, **React.js**, and **MongoDB** to handle user registration, login, and authentication. It provides secure authentication with JWT and cookie-based sessions. This API also includes endpoints to manage user data and preferences.

## 🚀 Running the Project Locally

Before you begin, ensure you have:

- **Node.js** and **npm** installed on your machine.

To run the project on your local machine, follow these steps:

### 1. Clone the repository:

Start by cloning the repository to your local machine:
```bash
https://github.com/shivasaineelam/finacplus-full-stack-shivasaineelam.git
```

### 2. Navigate to the project folder:

After cloning, navigate into the project directory:
```bash
cd backend
```

### 3. Set up environment variables:

Create a `.env` file in the backend folder of the project and include the following:

```env
PORT=5000
MONGODB_CONNECTION_URL=mongodb+srv://shivasai:shivasai@cluster0.8039zjo.mongodb.net/finacplus-fullstack
FRONTEND_URL=http://localhost:5173/
environment=dev
```

Make sure to replace the MongoDB connection URL with your own if needed.

### 4. Install the required dependencies:

Once your environment variables are in place, run the following command to install the necessary dependencies:
```bash
npm install
```

### 5. Start the server:

Now that everything is set up, you can start the server by running:
```bash
npm start
```

The server will start running at `http://localhost:5000`.

---
### 🚀 Run with Docker

If you have Docker installed, you can run the application using Docker Compose. Simply use the following command to build and run the containers:

```bash
docker-compose up --build
```

---



## 🔑 Features

- **User Registration:** Register a new user with details like name, email, password, age, and gender.
- **JWT Authentication:** Login using email and password and receive a JWT for secure authentication.
- **CRUD Operations:** Create, read, update, and delete user data.
- **Gender Options:** Retrieve available gender options such as Male, Female, Non-binary, etc.
- **Security:** Passwords are hashed using bcrypt, and JWT is used for token-based authentication.

## ⚙️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens), Cookie-based Authentication
- **Password Security:** bcryptjs
- **Input Validation:** express-validator

## 📜 API Endpoints

### 1. Register User

**Endpoint:** `POST /api/v1/register`

**Request Body:**
```json
{
  "name": "Shivasaineelam",
  "email": "neelamshivasai93479@gmail.com",
  "password": "password123",
  "age": 30,
  "dateofbirth": "1995-01-01",
  "gender": "Male",
  "about": "Software Developer"
}
```

**Response (Success):**
```json
{
  "statusCode": 201,
  "data": {
    "name": "Shivasaineelam",
    "email": "neelamshivasai93479@gmail.com",
    "age": 30,
    "dateofbirth": "1995-01-01T00:00:00.000Z",
    "gender": "Male",
    "about": "Software Developer"
  },
  "message": "User created successfully"
}
```

**Response (Failure - User Already Exists):**
```json
{
  "statusCode": 400,
  "message": "User already exists"
}
```

---

### 2. Login User

**Endpoint:** `POST /api/v1/login`

**Request Body:**
```json
{
  "email": "neelamshivasai93479@gmail.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "statusCode": 200,
  "data": {
    "name": "Shivasaineelam",
    "email": "neelamshivasai93479@gmail.com",
    "age": 30,
    "gender": "Male",
    "about": "Software Developer"
  },
  "message": "Login successful"
}
```

**Response (Failure - Invalid Credentials):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials. Please check your password."
}
```

---

### 3. Get Users

**Endpoint:** `GET /api/v1/users`

**Response (Success):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "name": "Shivasaineelam",
      "email": "neelamshivasai93479@gmail.com",
      "age": 30,
      "gender": "Male",
      "about": "Software Developer"
    }
  ],
  "message": "Users fetched successfully"
}
```

---

### 4. Get User

**Endpoint:** `GET /api/v1/user`

**Response (Success):**
```json
{
  "statusCode": 200,
  "data": {
    "name": "Shivasaineelam",
    "email": "neelamshivasai93479@gmail.com",
    "age": 30,
    "gender": "Male",
    "about": "Software Developer"
  },
  "message": "User fetched successfully"
}
```

---

### 5. Update User

**Endpoint:** `PATCH /api/v1/update`

**Request Body:**
```json
{
  "about": "Senior Software Developer"
}
```

**Response (Success):**
```json
{
  "statusCode": 200,
  "data": {
    "name": "Shivasaineelam",
    "email": "neelamshivasai93479@gmail.com",
    "age": 30,
    "gender": "Male",
    "about": "Senior Software Developer"
  },
  "message": "User updated successfully"
}
```

---

### 6. Delete User

**Endpoint:** `DELETE /api/v1/delete`

**Response (Success):**
```json
{
  "statusCode": 200,
  "message": "User deleted successfully"
}
```

---

### 7. Logout User

**Endpoint:** `POST /api/v1/logout`

**Response (Success):**
```json
{
  "statusCode": 200,
  "message": "User logged out successfully"
}
```

---

### 8. Get Gender Options

**Endpoint:** `GET /types/genders`

**Response (Success):**
```json
{
  "statusCode": 200,
  "data": ["Male", "Female", "Non-binary", "Prefer not to say"],
  "message": "Gender fetched successfully"
}
```

---
