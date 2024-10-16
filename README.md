# Bloggify

# Project Title

A Blogging Platform with User Authentication and Commenting System

## Project Overview

This project is a simple blogging platform that allows users to create, edit, and comment on blog posts. The system includes user authentication, blog management, and commenting functionality. The backend is developed using **Node.js** and **Express**, with **MongoDB** as the database to store user data, blogs, and comments.

## Features

1. **User Authentication**: Users can sign up, sign in, and sign out using secure password hashing and JWT token authentication.
2. **Blog Management**: Users can create new blog posts with titles, body content, and an optional cover image. Each blog post is associated with the user who created it.
3. **Commenting System**: Users can comment on blog posts, with the comments tied to the blog and the user who posted them.
4. **File Uploads**: Users can upload cover images for blogs, which are saved on the server's filesystem.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v12+)
- [MongoDB](https://www.mongodb.com/)
- NPM (comes with Node.js)

## Usage

### Routes

- **User Authentication**:  
  - `GET /signin` - User login page  
  - `POST /signin` - User login  
  - `GET /signup` - User signup page  
  - `POST /signup` - User signup  
  - `GET /logout` - User logout  

- **Blog Management**:  
  - `GET /blog/add-new` - Form to create a new blog post  
  - `POST /blog` - Create a new blog post  
  - `GET /blog/:id` - View a blog post and its comments  

- **Commenting**:  
  - `POST /blog/comment/:blogId` - Add a comment to a blog post  

## File Structure

```bash
├── models
│   ├── blog.js         # Blog model schema
│   ├── comment.js      # Comment model schema
│   └── user.js         # User model schema with authentication
├── routes
│   ├── blog.js         # Blog routes
│   └── user.js         # User routes
├── services
│   └── authentication.js  # Token validation and authentication service
├── public
│   └── uploads         # Directory for storing uploaded cover images
└── app.js              # Main entry point
```

## Models

### User

- Full Name
- Email (unique)
- Password (hashed)
- Role (USER/ADMIN)

### Blog

- Title
- Body
- Cover Image URL (optional)
- Created By (reference to User)

### Comment

- Content
- Blog ID (reference to Blog)
- Created By (reference to User)

## Authentication

User authentication is handled using JWT tokens. When a user signs in, a token is generated and stored in a cookie to authenticate future requests.

### Password Hashing

Passwords are hashed using `crypto` with a random salt for each user, ensuring strong security.

## License

This project is licensed under the MIT License.
