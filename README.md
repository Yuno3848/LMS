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

```
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
```

## 🚀 Installation

1. Install required dependencies:
```bash
npm install
```

2. Set up environment variables:
```env
ACCESS_SECRET_KEY=your_access_secret_key
REFRESH_SECRET_KEY=your_refresh_secret_key
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

3. Import models in your application:
```javascript
import User from './models/auth.models.js';
import { Course } from './models/course.model.js';
import { Enrollment } from './models/enrollment.model.js';
// ... other imports
```

## 💡 Usage

### Creating a User
```javascript
const user = new User({
  username: 'johndoe',
  fullname: 'John Doe',
  email: 'john@example.com',
  password: 'securepassword',
  role: 'student'
});
await user.save();
```

### Creating a Course
```javascript
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
```

### Enrolling a Student
```javascript
const enrollment = new Enrollment({
  studentId: studentId,
  courseId: courseId,
  isPaid: true,
  transactionId: transactionId
});
await enrollment.save();
```

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
