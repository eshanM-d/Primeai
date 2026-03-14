# PrimeTrade Full-Stack Task

This repository contains the backend and frontend for the PrimeTrade Full-Stack Developer Intern assignment.

## Project Structure

- `/backend`: Node.js, Express, MongoDB. Contains user authentication, role-based access, and task CRUD APIs.
- `/frontend`: React.js (Vite), TailwindCSS. A basic UI to interact with the backend APIs.

## Features

- **Backend:**
  - Secure JWT Authentication & Password Hashing (bcryptjs).
  - Role-based access control (Admin vs User).
  - Task CRUD APIs.
  - API Versioning (`/api/v1`).
  - Input Validation middleware (`express-validator`).
  - API Documentation via Swagger UI (`/api-docs`).
- **Frontend:**
  - Responsive UI with TailwindCSS.
  - User Registration and Login.
  - Protected Dashboard routing.
  - Full CRUD operations on Tasks.

## Running the Project

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `mongodb://localhost:27017` or update the `.env` file)

### Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend development server:
   ```bash
   npm install -g nodemon
   npm run dev 
   # OR
   node index.js
   ```
   *The server will run on [http://localhost:5000](http://localhost:5000).*

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas) - Note: If local is missing, the backend will automatically spin up an in-memory database!

### Local Development
1. Clone the repository.
2. Install dependencies for both backend and frontend:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Set up `.env` in the `backend` folder (use `.env.example` as a template).
4. Start both servers:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   # Server runs on http://localhost:5000

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   # Server runs on http://localhost:5173
   ```

## ✨ 1-Click Deployment (For Assignment Submission)

This project has been heavily configured to deploy flawlessly on free cloud providers so you can submit your Google Form link!

### 1. Deploy the Backend (Render.com)
1. Push this repository to GitHub.
2. Go to [Render.com](https://render.com/) and create a "New Web Service".
3. Connect your GitHub repository.
4. Render will automatically detect the `render.yaml` configuration!
5. In the Environment Variables section, add your `MONGO_URI` (from MongoDB Atlas) and a random `JWT_SECRET`. 
6. Click Deploy. *Copy the URL it generates.*

### 2. Deploy the Frontend (Vercel)
1. Go to [Vercel.com](https://vercel.com/) and click "Add New Project".
2. Import this same GitHub repository.
3. **Crucial Step:** In the "Framework Preset" choose `Vite`. Set the **Root Directory** to `frontend`.
4. In the Environment Variables, add:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-render-url.onrender.com/api/v1` *(Replace with the URL you got from Render)*
5. Click Deploy. Vercel will process the `vercel.json` file automatically and give you a live frontend URL!

*(You will submit the Vercel Frontend URL on your Google Form)*

## API Documentation

The backend includes auto-generated Swagger documentation. Once the backend server is running, navigate to:

**[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

This UI allows you to test out the registration, login, and task creation APIs directly (make sure to click "Authorize" and input a valid Bearer token for protected routes).
