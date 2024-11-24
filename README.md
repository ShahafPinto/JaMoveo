# Band Rehearsal Collaboration App

This project is a real-time web application designed for band members to connect to a rehearsal room and view song chords and lyrics selected by an admin in real-time. Using WebSocket communication via Socket.io, the app ensures live updates and synchronized song displays for all connected users.

## Tech Stack
- **ReactJS**: Frontend framework for building the user interface.
- **Express**: Backend framework for handling requests and routing.
- **Socket.io**: Real-time communication for live updates during rehearsals.
- **MongoDB**: NoSQL database for storing user and song data.
- **Bootstrap**: Frontend framework for responsive design.

## Features
- Real-time song selection and updates managed by an admin.
- WebSocket integration for live communication across the rehearsal room.
- Separate user roles: regular users and an admin with control over song selection.

## Running the Project

### Prerequisites
- Ensure **Node.js** and **npm** are installed on your machine.

### Steps

1. **Clone the Repository**
2. **Set Up Environment Variables**

3. **Run the Server:**
   ```bash
   cd server
   npm install
   nodemon
4. **Run the Client:**
   ```bash
   cd client
   npm install
   npm run dev
