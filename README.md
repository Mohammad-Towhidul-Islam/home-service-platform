<h1 align="center">
  🏠 ShebaGhor
</h1>

<h3 align="center">
  Home Service Booking Platform
</h3>

<p align="center">
  আপনার ঘরের প্রয়োজনীয় সেবার সহজ সমাধান, এক প্ল্যাটফর্মে।
</p>

ShebaGhor is a full-stack home service booking web application designed to make everyday household services easier, more accessible, and convenient for people in Chattogram, Bangladesh. Customers can explore essential home services, submit online booking requests, manage their accounts, and view their booking information — all in one place.

🌐 Live Demo: ShebaGhor 📦 Repository: Mohammad-Towhidul-Islam/home-service-platform



🌐 Project Overview

ShebaGhor একটি আধুনিক অনলাইন হোম সার্ভিস বুকিং প্ল্যাটফর্ম, যা মানুষের দৈনন্দিন গৃহস্থালি প্রয়োজনীয় সেবা পাওয়ার প্রক্রিয়াকে সহজ করার লক্ষ্যে তৈরি করা হয়েছে।

আমাদের দৈনন্দিন জীবনে বিভিন্ন সময় AC নষ্ট হওয়া, বৈদ্যুতিক সমস্যা, পানির পাইপে লিকেজ, বাসা পরিষ্কার কিংবা ফ্রিজ মেরামতের মতো সমস্যার সম্মুখীন হতে হয়। এসব সমস্যার জন্য প্রয়োজনীয় সার্ভিস খুঁজে পাওয়া এবং যোগাযোগ করা অনেক সময় কঠিন হয়ে যায়।

এই সমস্যাগুলো সহজ করার জন্য ShebaGhor-এ প্রয়োজনীয় হোম সার্ভিসগুলো একটি প্ল্যাটফর্মে নিয়ে আসা হয়েছে।

গ্রাহকরা সার্ভিস ব্রাউজ করতে পারবেন, পছন্দের সার্ভিস নির্বাচন করতে পারবেন, অনলাইনে বুকিংয়ের অনুরোধ পাঠাতে পারবেন এবং নিজেদের বুকিংয়ের তথ্য দেখতে পারবেন।

এছাড়াও, Admin ও Technician-এর জন্য আলাদা Management System তৈরি করা হয়েছে, যা সার্ভিস কার্যক্রম ও বুকিং পরিচালনায় সহায়তা করে।



🛠️ Technologies Used

Frontend

⚛️ Next.js 15 — App Router, page rendering, and application routing
⚛️ React 19 — Component-based user interface
🟨 JavaScript / JSX — Application development
🎨 Tailwind CSS — Responsive styling and layouts

Backend

🟢 Next.js API Routes — Backend API development
🛡️ Zod — Request validation
🔐 bcryptjs — Password hashing
🍪 Signed HttpOnly Cookie — Authentication and session management

Database & ORM

🐘 PostgreSQL — Relational database
🍃 Prisma ORM — Database access and management
☁️ Neon PostgreSQL — Hosted cloud database

Deployment & Tools

▲ Vercel — Application hosting and deployment
🐙 Git & GitHub — Version control and source code management



✨ Features

1. 🏠 Bangla-First Homepage

A user-friendly homepage designed to help customers discover essential household services.

বাংলা-ভিত্তিক সহজ ও ব্যবহারবান্ধব Interface।
Responsive homepage design.
Service categories and service information.
সহজ Navigation System।
Mobile, tablet, and desktop support.

2. 🛠️ Service Catalog

Customers can explore different types of home services from one place.

বর্তমানে প্ল্যাটফর্মে ছয়টি প্রাথমিক সার্ভিস যুক্ত করা হয়েছে:

❄️ AC Servicing — এসি পরিষ্কার, সার্ভিসিং ও প্রয়োজনীয় মেরামত।
⚡ Electrical Repair — বাসার বৈদ্যুতিক সমস্যা সমাধান।
🚰 Plumbing Service — পানির পাইপ, কল ও লিকেজ মেরামত।
🧹 Home Cleaning — বাসা ও প্রয়োজনীয় জায়গা পরিষ্কার।
🧊 Refrigerator Repair — ফ্রিজের সমস্যা পরীক্ষা ও মেরামত।
🪚 Carpentry — দরজা, আসবাবপত্র ও কাঠের কাজ।

Service information includes:

English and Bangla service names.
Service categories.
Service descriptions.
Pricing information.
Estimated service duration.
Active service availability.

3. 📅 Online Booking System

Customers can submit service booking requests through an online form.

বুকিংয়ের সময় গ্রাহকরা প্রয়োজনীয় তথ্য প্রদান করতে পারবেন:

Customer name.
Contact phone number.
Selected service.
Service area.
Full service address.
Problem description.
Preferred booking date and time.
Automatic request validation using Zod.
Booking information stored in PostgreSQL.
Unique booking reference generation.
Booking status history.

4. 👤 Customer Registration & Authentication

A customer account system for managing personal booking information.

Customer registration.
Secure password hashing using bcryptjs.
Customer login and logout.
Signed HttpOnly session cookies.
Protected customer pages.
Customer-specific booking access.

Public registration creates CUSTOMER accounts only.

5. 📋 My Bookings

Customers can access their own booking information through their accounts.

View personal booking records.
Access selected service information.
View booking details.
Retrieve bookings associated with their account.

6. 🧑‍💼 Admin & Manager Dashboard

A dedicated management foundation for handling service operations.

Admin/Manager dashboard.
Customer booking list.
Booking status management.
Service management API.
Staff management API.
Booking status history.
Audit log for important activities.
Role-based access control.

7. 🔧 Technician Management

A separate workflow for technician job management.

Dedicated technician dashboard.
View assigned jobs.
Retrieve technician job information.
Update job status through the API.
Support technician work management.

8. 📱 WhatsApp Communication

গ্রাহকদের সঙ্গে যোগাযোগ আরও সহজ করার জন্য WhatsApp Integration একটি গুরুত্বপূর্ণ পরিকল্পিত ফিচার।

ভবিষ্যতে এই সুবিধার মাধ্যমে গ্রাহকরা:

সরাসরি WhatsApp-এ যোগাযোগ করতে পারবেন।
সার্ভিস সম্পর্কে জানতে পারবেন।
নিজেদের সমস্যার বিবরণ জানাতে পারবেন।
বুকিংয়ের বিষয়ে আলোচনা করতে পারবেন।
সার্ভিসের সময় ও অন্যান্য তথ্য জানতে পারবেন।

Note: WhatsApp Business integration and direct WhatsApp booking require additional implementation and configuration.

9. 💰 BDT-Based Pricing System

The platform uses Bangladeshi Taka (BDT) for service pricing.

Prices stored as integer paisa.
Support for different pricing types.
Service-based price configuration.
Estimated service price recorded with bookings.

10. 📱 Responsive User Experience

Designed to provide a convenient experience across different devices.

Responsive page layouts.
Mobile-friendly interface.
User-friendly booking forms.
Clear validation feedback.
Bangla-first content presentation.



📂 Project Structure

home-service-platform/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.js
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── bookings/
│   │   │   │   ├── services/
│   │   │   │   └── staff/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   ├── me/
│   │   │   │   └── register/
│   │   │   ├── bookings/
│   │   │   │   ├── mine/
│   │   │   │   └── route.js
│   │   │   ├── services/
│   │   │   └── staff/
│   │   │
│   │   ├── admin/
│   │   ├── booking/
│   │   ├── login/
│   │   ├── my-bookings/
│   │   ├── register/
│   │   ├── staff/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   └── lib/
│       ├── auth.js
│       └── prisma.js
│
├── public/
├── .env.example
├── package.json
└── README.md

This is a simplified overview of the main application directories. Actual files may vary depending on the current implementation.



⚙️ Getting Started

Prerequisites

Make sure you have the following installed:

Node.js 20 or later
npm
PostgreSQL 14 or later
A PostgreSQL database, such as Neon

1. Clone the Repository

git clone https://github.com/Mohammad-Towhidul-Islam/home-service-platform.git

cd home-service-platform

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file in the project root and configure the following variables:

# PostgreSQL Database
DATABASE_URL="your_postgresql_connection_string"

# Authentication
AUTH_SECRET="your_random_secret_key"

# Application
NEXT_PUBLIC_APP_NAME="ShebaGhor"

Important:

Replace the database placeholder with your actual PostgreSQL connection string.
Use a strong random value for AUTH_SECRET.
Never commit your .env file or expose database credentials publicly.
Configure the required environment variables in Vercel for production deployment.

4. Generate Prisma Client

npx prisma generate

5. Run Database Migration

For a new local database:

npx prisma migrate dev --name init

6. Seed Initial Data

npm run db:seed

This command inserts the initial service categories, services, and example service areas.

7. Start the Development Server

npm run dev

Open http://localhost:3000 in your browser.



📜 Available Scripts

Command

Description

npm run dev

Start the development server

npm run build

Generate Prisma Client and build the application

npm start

Start the production server

npm run db:seed

Seed initial application data

npx prisma generate

Generate Prisma Client

npx prisma migrate dev --name init

Run development database migration



🔌 API Endpoints

Customer & Public APIs

Method

Endpoint

Description

GET

/api/services

Retrieve available services

POST

/api/bookings

Create a booking request

GET

/api/bookings/mine

Retrieve customer bookings

POST

/api/auth/register

Register a customer

POST

/api/auth/login

Authenticate a customer

POST

/api/auth/logout

Sign out a customer

GET

/api/auth/me

Retrieve current user information

Admin APIs

Method

Endpoint

Description

GET/PATCH

/api/admin/bookings

Manage customer bookings

GET/POST

/api/admin/services

Manage services

GET/POST

/api/admin/staff

Manage staff

Technician APIs

Method

Endpoint

Description

GET/PATCH

/api/staff/jobs

Retrieve and update assigned jobs



🌐 Main Application Routes

Route

Description

/

Public homepage

/booking

Service booking page

/register

Customer registration

/login

Customer login

/my-bookings

Customer booking list

/admin

Admin/Manager dashboard

/staff

Technician dashboard



☁️ Deployment

ShebaGhor is deployed using modern cloud infrastructure.

Deployment Platforms

Platform

Purpose

GitHub

Source code repository

Neon

Cloud PostgreSQL database

Vercel

Application hosting and deployment

Deployment Process

Push the project source code to GitHub.
Import the repository into Vercel.
Configure the required environment variables.
Connect the Neon PostgreSQL database.
Deploy the Next.js application.
Test the homepage, booking workflow, authentication, and protected routes.

Live Application

🌐 Website: https://shebagor29.vercel.app



🔐 Security & Important Notes

The project includes several security-related foundations:

Password hashing using bcryptjs.
Signed HttpOnly session cookies.
Request validation using Zod.
Separate customer and administrative access.
Role-based authorization.
Protected application routes.

Important setup notes:

Public registration creates CUSTOMER accounts only.
Admin accounts must be created through a secure administrative process.
Anonymous bookings are associated with phone-based customer records.
Guest bookings are not automatically merged into later registered accounts.

Before a full commercial launch, additional measures should be implemented, including automated tests, phone verification, password reset, CSRF/origin protections where appropriate, rate limiting, payment gateway verification, database backups, monitoring, and a security review.



🚀 Future Improvements

Potential enhancements for upcoming versions include:

📱 WhatsApp Business integration for customer communication and booking.
💳 Online payment gateway integration.
🔔 Booking notifications and reminders.
📲 SMS / OTP phone verification.
⭐ Customer reviews and ratings.
📍 Improved service area management.
📊 Advanced booking analytics.
🔐 Password recovery system.
🧪 Automated testing and monitoring.
📈 Improved booking tracking.



🎯 Our Vision

আমাদের লক্ষ্য হলো মানুষের দৈনন্দিন হোম সার্ভিসের প্রয়োজনকে একটি সহজ ও সুবিধাজনক ডিজিটাল প্ল্যাটফর্মের মাধ্যমে পূরণ করতে সহায়তা করা।

আমরা চাই, একজন গ্রাহক যেন খুব সহজেই প্রয়োজনীয় সার্ভিস খুঁজে পান, নিজের সুবিধামতো বুকিংয়ের অনুরোধ পাঠাতে পারেন এবং সার্ভিস টিমের সঙ্গে যোগাযোগ করতে পারেন।

সহজ বুকিং, প্রয়োজনীয় সেবা এবং আরও স্বাচ্ছন্দ্যময় জীবন — এটাই ShebaGhor-এর লক্ষ্য।



👨‍💻 Project Information

Information

Details

Project Name

ShebaGhor

Project Type

Full-Stack Home Service Booking Platform

Location

Chattogram, Bangladesh

Frontend

Next.js, React, Tailwind CSS

Backend

Next.js API Routes

Database

PostgreSQL

ORM

Prisma

Cloud Database

Neon

Hosting

Vercel



🌐 Live Demo

আজই ভিজিট করুন এবং ShebaGhor-এর ডিজিটাল হোম সার্ভিস প্ল্যাটফর্মটি ঘুরে দেখুন।

Live Website: https://shebagor29.vercel.app

GitHub Repository: home-service-platform



<p align="center">
  <strong>🏠 ShebaGhor — আপনার ঘরের সেবায়, আপনার পাশে। ❤️</strong>
  <br/>
  <sub>বাংলাদেশে তৈরি, মানুষের দৈনন্দিন প্রয়োজনের কথা ভেবে।</sub>
</p>



*ShebaGhor — আপনার দৈনন্দিন হোম সার্ভিসের সহজ সমাধান।
