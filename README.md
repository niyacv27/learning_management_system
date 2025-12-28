# Learning Management System (LMS)
## Project Overview

The **Learning Management System (LMS)** is a full-stack web application designed to manage courses, users, and learning activities in an educational environment. The system supports **role-based access for Admin, Teacher, and Student**, enabling secure authentication, course management, enrollment, attendance tracking, and performance evaluation.

This project is developed as part of the **Full Stack Development – Week 9 Capstone Assignment**, focusing on authentication, role handling, and complete CRUD functionality with proper frontend–backend integration.

---
## Objectives

- Implement secure authentication and authorization

- Enable role-based access control

- Build a fully functional CRUD module

- Ensure frontend–backend integration

- Apply validation and error handling

---
## Technologies Used
### Frontend

- React.js

- React Router

- Axios

- CSS

### Backend

- Node.js

- Express.js

- MongoDB (Mongoose)

- JSON Web Token (JWT)

- Multer (Image Upload)

---
## Project Structure
```md
learning-management-system/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── App.css
│   ├── package.json
│   └── .gitignore
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── .gitignore
└── README.md
```

---

## Authentication & Authorization

- User Registration API

- User Login API using JWT

- Secure token storage on frontend

- Protected routes using role-based access

- Unauthorized access handling

---
## Features Implemented
### Admin Features

- Admin login with secure authentication

- Add teachers with profile image upload

- Add new courses

- Edit course details

- Delete courses

- View all courses with assigned teachers

= Full access to system data

### Teacher Features

- Teacher login

- View assigned courses

- View enrolled students for each course

- Add attendance percentage for students

- Add assignment marks for students

### Student Features

- User registration and login

- View all available courses

- View course details including teacher name and image

- Enroll in courses

- View enrolled courses

- View attendance and marks assigned by teachers

---
## Core CRUD Module
### Main Entity: Course

CRUD Operations:

- Create – Admin adds courses

- Read – Courses displayed to Admin, Teacher, and Students

- Update – Admin edits course details

- Delete – Admin deletes courses

All CRUD APIs are fully connected to the frontend and data is displayed dynamically in the UI.

---
## Validation & Error Handling
### Backend Validation

- Required field validation

- Duplicate email prevention

- Role-based API restrictions

### Frontend Validation

- Email format validation

- Password length validation

- Empty field validation

### Error Handling

- Meaningful error messages

- Graceful API failure handling

- Unauthorized access redirection

---
## Submission Details

Screenshots / screen recordings include:

- Login page

- Registration page

- Admin CRUD operations

- Role-based dashboards (Admin, Teacher, Student)

---
## Conclusion

This project satisfies all the requirements of the Week 9 Capstone Assignment, including authentication, role-based access, CRUD operations, frontend–backend integration, and validation.
