# Learning Management System (LMS)
## Project Overview

The **Learning Management System (LMS)** is a full-stack web application designed to manage courses, users, and learning activities in an educational environment.
The system supports **role-based access** for **Admin, Teacher, and Student**, enabling secure authentication, course management, enrollment workflows, attendance tracking, performance evaluation, and status-based learning progression.

This project is developed as part of the **Full Stack Development – Final Capstone Project**, focusing on authentication, role handling, CRUD functionality, advanced workflows, security, validation, and production-ready backend practices.

---
## Objectives

- Implement secure authentication and authorization

- Enable role-based access control

- Build a fully functional CRUD module

- Implement status-based workflows

- Enforce ownership and access rules

- Apply backend validation and centralized error handling

- Enhance application security

- Ensure complete frontend–backend integration

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
│   ├── server.js
│   ├── createAdmin.js
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

- Protected routes using authentication middleware

- Role-based API access (Admin / Teacher / Student)

- Unauthorized access handling with proper error messages

---
## Features Implemented
### Admin Features

- Secure admin login

- Create, update, and delete courses

- View all courses and enrollments

- Approve or reject student enrollments

- Full access to system data

---
### Teacher Features

- Teacher login

- View assigned courses

- View enrolled students for each course

- Add attendance percentage

- Add marks for students

- Mark courses as completed

---
### Student Features

- User registration and login

- View all available courses

- Enroll in courses

- Track enrollment status

- View enrolled courses

- View attendance and marks

---
## Core CRUD Module
### Main Entity: Course

#### CRUD Operations

- Create – Admin adds courses

- Read – Courses visible to Admin, Teacher, and Students

- Update – Admin edits course details

- Delete – Admin deletes courses

All CRUD APIs are fully integrated with the frontend and rendered dynamically in the UI.

---
## Status-Based Workflow 

- Status field added to enrollment entity

- Valid statuses:

  - pending

  - approved

  - rejected

  - completed

- Default status assigned during enrollment

- Dedicated API to update status

- Role-based status transitions:

  - Admin → approve / reject

  - Teacher → mark completed

- Status displayed on frontend using color-coded badges

---
## Ownership & Role-Based Rules

- Admin can view and modify all records

- Students can view and modify only their own enrollments

- Teachers can manage only their assigned courses and students

- Backend ownership checks enforced

- Unauthorized actions blocked with proper error responses

---
## Validation & Error Handling
### Backend Validation

- Required field validation

- Minimum length constraints

- MongoDB ObjectId validation

- Duplicate email prevention

- Role-based API restrictions

### Frontend Validation

- Email format validation

- Password length validation

- Empty field validation

### Centralized Error Handling

- Global error handling middleware

- Consistent HTTP status codes

- Clear, user-friendly error messages

- Prevents server crashes

---
## Security Enhancements

- JWT validation on all protected routes

- Secure HTTP headers

- API rate limiting

- Graceful handling of expired or invalid tokens

---
## Submission Details

Screenshots include :

- Login page

- Registration page

- Admin CRUD operations

- Role-based dashboards (Admin, Teacher, Student)

- Status-based workflow (Pending → Approved → Completed)

- Unauthorized access handling

- Validation and error handling examples

---
## Conclusion

This project successfully fulfills all requirements of the Final Capstone Project, including:

- Secure authentication and authorization

- Role-based access control

- Complete CRUD functionality

- Status-based workflow implementation

- Ownership enforcement

- Backend validation and centralized error handling

- Security best practices

The application follows industry-standard backend architecture, making it production-ready and interview-ready.
  

Security best practices

The application follows industry-standard backend architecture, making it production-ready and interview-ready.
