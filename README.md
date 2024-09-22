# MERN Chat Application
This is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js). 
It allows users to register, login, send messages in one-on-one chats or group chats, and includes features like group creation, message handling, and user management.

# Features
User Authentication (Registration and Login)
One-to-One and Group Chats
Real-time Messaging
Create, Rename, Add/Remove Users in Group Chats
Chat list with the latest message display
User profile picture management

## Tech Stack

**Frontend:** React JS

**Backend:** Node JS, Express JS

**Database:** Mongo DB

**Authentication:** JSON Web Token (JWT) and bcrypt

**Real-time Communication:** Socket.IO (optional for real-time features)

## Demo
[https://talk-a-tive.herokuapp.com/](https://talk-a-tive-7fgq.onrender.com)

## Installation
# Prerequisites
Before you begin, ensure you have the following installed:

Node.js
MongoDB
npm (Node Package Manager)

# Steps
Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

Install dependencies

Navigate into the root folder and run:

```bash
npm install
```

Navigate into the /frontend folder and run:

```bash
npm install
```

Navigate into the /backend folder and run:

```bash
npm install
```

## Run Locally


Run the Backend

bash
Copy code
cd backend
npm start
This will start the Express server at http://localhost:5000.

Run the Frontend

bash
Copy code
cd frontend
npm start
The React app will start at http://localhost:3000.

Environment Variables
Create a .env file in the root of your project and add the following environment variables:

```bash
PORT=5000
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret>
```

Ensure to replace <Your MongoDB connection string> with your actual MongoDB connection URI and <Your JWT secret> with a secret string for JWT signing.

Folder Structure
```graphql
Copy code
root/
│
├── frontend/           # React application (Frontend)
│   ├── src/
│   │   ├── components/ # All reusable components (chat, login, etc.)
│   │   ├── pages/      # Page-level components (Home, Chat, etc.)
│   │   ├── App.js      # Main application entry point
│   │   └── index.js    # Main React DOM render
│   └── package.json    # Frontend dependencies
│
├── backend/            # Backend API (Node.js, Express)
│   ├── config/
│   │   └── db.js       # Database connection logic
│   │   └── generateToken.js # JWT token generation logic
│   ├── controllers/
│   │   ├── userController.js # User registration, login logic
│   │   ├── chatController.js # Chat creation and management logic
│   │   └── messageController.js # Sending and fetching messages logic
│   ├── middleware/
│   │   └── authMiddleware.js # Authentication middleware for protected routes
│   │   └── errorMiddleware.js # Error handling middleware
│   ├── models/
│   │   ├── userModel.js   # User Schema
│   │   ├── chatModel.js   # Chat Schema
│   │   └── messageModel.js # Message Schema
│   ├── routes/
│   │   ├── userRoutes.js  # Routes related to user authentication
│   │   ├── chatRoutes.js  # Routes related to chat management
│   │   └── messageRoutes.js # Routes related to messaging
│   ├── server.js          # Application entry point
│   └── package.json       # Backend dependencies
│
└── .env                   # Environment variables
```

Backend Overview
1. User Authentication
File: /backend/controllers/userController.js
Functionality: Handles user registration and login using JWT for authentication and bcrypt for password encryption.
2. Chat Management
File: /backend/controllers/chatController.js
Functionality: Allows users to create, fetch, and manage one-on-one or group chats. This includes adding/removing users from group chats and renaming groups.
3. Message Handling
File: /backend/controllers/messageController.js
Functionality: Handles sending and retrieving messages. Each message is linked to a chat and a sender, and all messages can be fetched for a specific chat.
Frontend Overview
The frontend is built using React, and it interacts with the backend API to manage users, chats, and messages.

Key Components:
Login and Register Pages: Handle user authentication.
Chat Page: Displays all chats and messages. Users can send messages and interact with group chats.
Create Group Modal: Allows users to create new group chats and manage group members.
Styling:
You can apply any CSS framework like AdminLTE or custom styles. Each component is styled to be responsive and user-friendly.

License
This project is open source and available under the MIT License.

- [@YatharthZinzuwadia](https://github.com/YatharthZinzuwadia)
