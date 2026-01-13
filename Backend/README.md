Student Leave & Permission Management System
Backend Service (MERN Stack)
Overview

This repository contains the backend implementation of the Student Leave & Permission Management System, a role-based web application designed to replace informal and handwritten leave processes in educational institutions.

The backend is responsible for authentication, role-based access control, leave request lifecycle management, approval workflows, reporting, and audit logging. It is built using Node.js, Express, and MongoDB, following standard software engineering principles such as separation of concerns, clear responsibility boundaries, and immutable state transitions.

Core Objectives

Enforce strict role-based access control

Provide a clean and traceable leave request lifecycle

Support faculty approval workflows

Enable department-level reporting and oversight

Maintain structured, auditable records suitable for analysis and documentation

User Roles Supported

The system supports three distinct user roles:

Student

Apply for leave

View leave request status and history

Read faculty remarks on rejected requests

Faculty

View pending leave requests from assigned students

Approve or reject leave requests

Add remarks during decision making

Department Admin / HoD

View aggregated leave statistics
Generate reports by class, faculty, or time period
Monitor trends and approval patterns.
Each role is enforced at the API and middleware level. Unauthorized access is blocked by design.

Technology Stack

Runtime: Node.js
Framework: Express.js
Database: MongoDB
ODM: Mongoose
Authentication: JWT (JSON Web Tokens)
File Uploads: Multer
Environment Management: dotenv