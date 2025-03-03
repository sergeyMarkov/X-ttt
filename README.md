# Tic Tac Toe - Demo Multiplayer Game Web App Built with React.js and Node.js

This is a simple example of a full-stack multiplayer game web application using **React.js** on the frontend and **Node.js** on the backend. Below are the key technologies used in the project:

## Frontend Libraries:
- **React**: A JavaScript library for building user interfaces.
- **Webpack**: A module bundler for JavaScript applications.
- **Babel**: A JavaScript compiler for ES6+ compatibility.
- **React Router**: A library for routing in React applications.
- **Ampersand**: A lightweight library for managing application state.
- **SASS**: A CSS preprocessor for more maintainable and readable CSS.
- **Jest**: A JavaScript testing framework.

## Backend Libraries:
- **Node.js**: A JavaScript runtime for building the server.
- **Socket.IO**: A library for real-time communication between the server and clients.
- **Express**: A minimal and flexible Node.js web application framework.

## Folder Structure:
- **WS**: Contains the server-side code and compiled frontend assets.
- **react_ws_src**: Contains the React development source code and related testing files.

## Setup and Testing Instructions:

### 1. Install and Build the React Application:
   - Navigate to the source code directory:
     ```bash
     cd react_ws_src
     ```
   - Build the React app:
     ```bash
     npm build
     ```

### 2. Copy Files to Production Environment:
   - After building the app, copy the necessary files into the production environment:
     ```bash
     npm run build:copyall_mac
     ```

### 3. Run the Application in Production:
   - Once the files are copied, switch to the production environment and run the application:
     ```bash
     npm run
     ```

This setup will allow you to locally test and deploy the full multiplayer game application.

---

Feel free to adapt the instructions for your own development environment.
