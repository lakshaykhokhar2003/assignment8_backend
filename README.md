# Event Management Platform - Backend

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Express.js](https://img.shields.io/badge/Express.js-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--time-yellow)

Welcome to the backend of the **Event Management Platform**! This is a full-stack application built to allow users to
create, manage, and view events in real-time. The backend is powered by **Node.js**, **Express.js**, and **MongoDB**,
with **JWT** for authentication and **Socket.IO** for real-time updates.

---

## Features

- **User Authentication**:
    - Register and login with JWT-based authentication.
    - Secure password hashing using `bcryptjs`.

- **Event Management**:
    - Create, read, update, and delete (CRUD) events.
    - Events are linked to the user who created them.
    - Real-time updates for attendees using **Socket.IO**.

- **Scalable and Modular Code**:
    - Clean, modular, and well-documented codebase.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose for ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Real-Time Communication**: Socket.IO
- **API Testing**: Postman

---

## Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lakshaykhokhar2003/assignment8_backend
   ```
2. **.env File**:
    - Create a `.env` file in the root directory.
        - Add the following environment variables:
          ```env
          PORT=your_port
          MONGO_URI=<your_mongodb_uri>
          JWT_SECRET=your_jwt_secret
             ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the server**:
   ```bash
    npm start
    ```

## API Endpoints

### Authentication

| Method | Endpoint         | Description                    |
|--------|------------------|--------------------------------|
| POST   | `/auth/register` | Register a new user.           |
| POST   | `/auth/login`    | Login and receive a JWT token. |

### Events

| Method | Endpoint            | Description                               |
|--------|---------------------|-------------------------------------------|
| POST   | `/events`           | Create a new event (requires JWT).        |
| GET    | `/events`           | Get all events.                           |
| GET    | `/events/:id`       | Get event by id.                          |
| GET    | `/events/my-events` | Get events created by the logged-in user. |
| PUT    | `/events/:id`       | Update an event (requires JWT).           |
| DELETE | `/events/:id`       | Delete an event (requires JWT).           |

### Real-Time Updates

- **Socket.IO** is used to emit real-time updates when:
    - A new event is created.
    - An attendee joins an event.

## LICENSE
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.