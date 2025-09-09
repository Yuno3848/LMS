# 🎓 Learning Management System (LMS)

A full-stack Learning Management System built with modern web technologies, featuring course creation, user management, payment processing, and progress tracking.

![GitHub stars](https://img.shields.io/github/stars/Yuno3848/LMS?style=social)
![GitHub forks](https://img.shields.io/github/forks/Yuno3848/LMS?style=social)
![GitHub issues](https://img.shields.io/github/issues/Yuno3848/LMS)
![GitHub license](https://img.shields.io/github/license/Yuno3848/LMS)

## 🚀 Features

### 👥 User Management

- **Multi-role authentication** (Students, Instructors, Admins)
- **Secure JWT-based authentication** with refresh tokens
- **Email verification** and password reset functionality
- **Profile management** for both students and instructors
- **Avatar upload** and profile customization

### 📚 Course Management

- **Hierarchical course structure** (Course → Section → Item → SubItem)
- **Multiple content types** (Videos, Quizzes, Text content)
- **Course difficulty levels** (Beginner, Intermediate, Advanced)
- **Draft and published states** for course workflow
- **Tag-based categorization** and search
- **Course thumbnails** and rich media support

### 💳 Payment System

- **Multiple payment gateways** (PayPal, Razorpay)
- **Multi-currency support** (INR, USD)
- **Coupon system** with percentage and fixed discounts
- **Transaction tracking** with detailed payment history
- **Secure payment processing** with status management

### 📊 Progress Tracking

- **Real-time enrollment management**
- **Percentage-based progress calculation**
- **Lecture completion tracking**
- **Quiz scoring system**
- **Completion certificates** (planned feature)

## 🏗️ Architecture

\`\`\`
LMS/
├── backend/ # Node.js/Express API server
│ ├── controllers/ # Route controllers
│ ├── models/ # MongoDB/Mongoose models
│ ├── middleware/ # Authentication & validation
│ ├── routes/ # API routes
│ └── utils/ # Helper functions
├── frontend/ # React.js client application
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Application pages
│ │ ├── hooks/ # Custom React hooks
│ │ ├── context/ # React context providers
│ │ └── utils/ # Frontend utilities
└── .vscode/ # VS Code configuration
\`\`\`

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Multer** - File upload handling

### Frontend

- **React.js** - Frontend framework
- **JavaScript/ES6+** - Programming language
- **CSS3** - Styling
- **Axios** - HTTP client (assumed)
- **React Router** - Client-side routing (assumed)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

## ⚡ Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/Yuno3848/LMS.git
cd LMS
\`\`\`

### 2. Backend Setup

\`\`\`bash
cd backend
npm install

# Create environment file

cp .env.example .env

# Edit .env with your configuration

\`\`\`

### 3. Frontend Setup

\`\`\`bash
cd ../frontend
npm install
\`\`\`

### 4. Environment Variables

Create a `.env` file in the backend directory:

\`\`\`env

# Database

MONGODB_URI=mongodb://localhost:27017/lms

# or for MongoDB Atlas:

# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms

# JWT Secrets

ACCESS_SECRET_KEY=your_super_secret_access_key_here
REFRESH_SECRET_KEY=your_super_secret_refresh_key_here

# Token Expiration

ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Server Configuration

PORT=5000
NODE_ENV=development

# Payment Gateways (Optional)

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Configuration (Optional)

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
\`\`\`

### 5. Run the Application

**Start Backend Server:**
\`\`\`bash
cd backend
npm start

# or for development

npm run dev
\`\`\`

**Start Frontend Application:**
\`\`\`bash
cd frontend
npm start
\`\`\`

The application will be available at:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📊 Database Schema

### Core Models

#### User Model

\`\`\`javascript
{
username: String,
fullname: String,
email: String,
password: String, // Hashed with bcrypt
role: ['student', 'instructor', 'admin'],
avatar: {
url: String,
localPath: String
},
isEmailVerified: Boolean,
emailVerificationToken: String,
emailVerificationExpiry: Date
}
\`\`\`

#### Course Model

\`\`\`javascript
{
title: String,
description: String,
price: {
base: Number,
final: Number,
currency: ['INR', 'USD']
},
category: String,
difficulty: ['beginner', 'intermediate', 'advance'],
instructor: ObjectId, // Reference to User
thumbnail: {
url: String,
localPath: String
},
isPublished: Boolean,
tags: [String]
}
\`\`\`

#### Enrollment Model

\`\`\`javascript
{
studentId: ObjectId, // Reference to User
courseId: ObjectId, // Reference to Course
isPaid: Boolean,
progress: Number, // Percentage (0-100)
completedAt: Date,
transactionId: ObjectId
}
\`\`\`

For detailed schema information, see the existing README sections below.

## 🔐 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/forgot-password` - Request password reset

### Courses

- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course (Instructor only)
- `PUT /api/courses/:id` - Update course (Instructor only)
- `DELETE /api/courses/:id` - Delete course (Instructor only)

### Enrollments

- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/my-courses` - Get user's enrolled courses
- `PUT /api/enrollments/:id/progress` - Update course progress

### Payments

- `POST /api/payments/create` - Create payment intent
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/history` - Get payment history

## 🧪 Testing

\`\`\`bash

# Run backend tests

cd backend
npm test

# Run frontend tests

cd frontend
npm test
\`\`\`

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Vercel)

1. Set up environment variables on your hosting platform
2. Configure MongoDB Atlas for production database
3. Deploy the backend folder

### Frontend Deployment (Netlify/Vercel)

1. Build the frontend application
2. Configure API base URL for production
3. Deploy the build folder

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yuno3848**

- GitHub: [@Yuno3848](https://github.com/Yuno3848)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by modern learning platforms like Udemy and Coursera
- Built with love for the developer and education community

## 📞 Support

If you have any questions or need help with setup, please:

- Open an issue on GitHub
- Check existing issues for solutions
- Contact the maintainer

---

⭐ **Star this repository if you find it helpful!**

---

# Learning Platform MongoDB Schema

A comprehensive MongoDB schema for an online learning platform built with Mongoose and Node.js. This schema supports course creation, user management, enrollments, payments, and progress tracking.

## 📋 Table of Contents

- [Overview](#overview)
- [Models](#models)
- [Schema Relationships](#schema-relationships)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Data Structure](#data-structure)

## 🎯 Overview

This learning platform schema supports:

- **Multi-role users** (students, instructors, admins)
- **Course management** with sections and lectures
- **Payment processing** with coupons and transactions
- **Progress tracking** and enrollment management
- **Profile management** for both students and instructors

## 📚 Models

### User Management

- **`User`** - Core user authentication and profile
- **`InstructorProfile`** - Additional instructor-specific data
- **`StudentProfile`** - Additional student-specific data

### Course Structure

- **`Course`** - Main course information
- **`CourseSection`** - Course sections/modules
- **`ItemSection`** - Individual items within sections
- **`SubItemSection`** - Actual content (videos, quizzes, text)

### Business Logic

- **`Enrollment`** - Student course enrollments
- **`Transaction`** - Payment transactions
- **`Coupon`** - Discount coupons

## 🔗 Schema Relationships

\`\`\`
User
├── InstructorProfile (1:1)
├── StudentProfile (1:1)
├── Courses (1:many) [as instructor]
├── Enrollments (1:many) [as student]
└── Transactions (1:many)

Course
├── CourseSection (1:many)
├── Instructor (many:1) → User
├── Coupon (many:1)
└── Enrollments (1:many)

CourseSection
└── ItemSection (1:many)

ItemSection
└── SubItemSection (1:many)

Enrollment
├── Student (many:1) → User
├── Course (many:1)
└── Transaction (many:1)
\`\`\`

## 🚀 Installation

1. Install required dependencies:

\`\`\`bash
npm install
\`\`\`

2. Set up environment variables:

\`\`\`env
ACCESS_SECRET_KEY=your_access_secret_key
REFRESH_SECRET_KEY=your_refresh_secret_key
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
\`\`\`

3. Import models in your application:

\`\`\`javascript
import User from './models/auth.models.js';
import { Course } from './models/course.model.js';
import { Enrollment } from './models/enrollment.model.js';
// ... other imports
\`\`\`

## 💡 Usage

### Creating a User

\`\`\`javascript
const user = new User({
username: 'johndoe',
fullname: 'John Doe',
email: 'john@example.com',
password: 'securepassword',
role: 'student'
});
await user.save();
\`\`\`

### Creating a Course

\`\`\`javascript
const course = new Course({
title: 'JavaScript Fundamentals',
description: 'Learn JavaScript from scratch',
price: {
base: 2999,
final: 1999,
currency: 'INR'
},
category: 'Programming',
difficulty: 'beginner',
instructor: instructorId,
thumbnail: {
url: 'https://example.com/thumbnail.jpg',
localPath: '/uploads/thumbnail.jpg'
}
});
await course.save();
\`\`\`

### Enrolling a Student

\`\`\`javascript
const enrollment = new Enrollment({
studentId: studentId,
courseId: courseId,
isPaid: true,
transactionId: transactionId
});
await enrollment.save();
\`\`\`

## ✨ Features

### Authentication & Authorization

- **Secure password hashing** using bcrypt
- **JWT token generation** (access & refresh tokens)
- **Email verification** system
- **Password reset** functionality
- **Role-based access** (student, instructor, admin)

### Course Management

- **Hierarchical course structure** (Course → Section → Item → SubItem)
- **Multiple content types** (video, quiz, text)
- **Course difficulty levels** (beginner, intermediate, advance)
- **Publishing system** with draft/published states
- **Tag-based categorization**

### Payment System

- **Multiple payment gateways** (PayPal, Razorpay)
- **Multi-currency support** (INR, USD)
- **Coupon system** with percentage/fixed discounts
- **Transaction tracking** with status management

### Progress Tracking

- **Enrollment management** with completion tracking
- **Percentage-based progress** calculation
- **Lecture completion** tracking
- **Quiz scoring** system

## 📊 Data Structure

### User Roles

- **Student**: Can enroll in courses, track progress
- **Instructor**: Can create courses, manage content
- **Admin**: System administration (implied)

### Content Types

- **Video**: Video lectures with duration tracking
- **Quiz**: Interactive quizzes with scoring
- **Text**: Text-based content/articles

### Payment Status

- **PENDING**: Payment initiated but not completed
- **COMPLETED**: Successfully processed payment
- **FAILED**: Failed payment transaction

### Verification Status

- **not_requested**: No verification requested
- **pending**: Verification under review
- **verified**: Successfully verified
- **rejected**: Verification rejected

## 🔧 Model Details

### Key Features by Model

**User Model:**

- Password encryption with bcrypt
- JWT token generation methods
- Email verification system
- Avatar support with URL and local path

**Course Model:**

- Flexible pricing with base/final amounts
- Thumbnail image support
- Course expiry dates
- Publishing workflow

**Enrollment Model:**

- Progress tracking with percentage completion
- Payment integration
- Completion date tracking

**Transaction Model:**

- Multiple payment gateway support
- Raw payment response storage
- Contact and email capture

## 📝 Notes

- All string fields use `trim: true` to remove whitespace
- Timestamps are automatically added where specified
- Indexes are created on frequently queried fields
- Foreign key relationships use MongoDB ObjectId references
- Password fields are automatically hashed before saving

## 🛠️ Development Tips

1. **Always populate references** when querying related data
2. **Use indexes** on frequently searched fields
3. **Validate required environment variables** before starting the application
4. **Handle password comparison** using the built-in `comparePassword` method
5. **Use the token generation methods** for authentication workflows
