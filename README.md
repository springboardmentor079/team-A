# Civic Engagement Platform

A full-stack digital civic platform for creating petitions, polls, and reporting issues.

## Features

- **User & Admin Authentication** (Login, Register, Forgot Password)
- **Dashboard** - View stats for petitions, polls, reports, and signed petitions
- **Petitions** - Create, view, and sign petitions
- **Polls** - Create polls and vote
- **Reports** - Report issues with subject, location, description, and images
- **Officials Page** - For signing petitions
- **Settings** - Edit users, admin management, theme customization

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT + bcrypt

## Setup Instructions

### Backend Setup

1. Install backend dependencies:
```bash
npm run install-server
```

2. Start the backend server:
```bash
npm run server
```

Server runs on http://localhost:5000

### Frontend Setup

1. Install frontend dependencies:
```bash
npm install
```

2. Start the frontend:
```bash
npm run dev
```

Frontend runs on http://localhost:5173

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user/admin
- POST `/api/auth/login` - Login
- POST `/api/auth/forgot-password` - Request password reset
- PUT `/api/auth/reset-password/:token` - Reset password

### Petitions
- GET `/api/petitions` - Get all petitions
- POST `/api/petitions` - Create petition (protected)
- GET `/api/petitions/:id` - Get petition by ID
- POST `/api/petitions/:id/sign` - Sign petition (protected)
- GET `/api/petitions/signed` - Get signed petitions (protected)

### Polls
- GET `/api/polls` - Get all polls
- POST `/api/polls` - Create poll (protected)
- GET `/api/polls/:id` - Get poll by ID
- POST `/api/polls/:id/vote` - Vote on poll (protected)

### Reports
- GET `/api/reports` - Get all reports (protected)
- POST `/api/reports` - Create report with images (protected)
- GET `/api/reports/:id` - Get report by ID (protected)
- PUT `/api/reports/:id/status` - Update report status (admin only)

### Dashboard
- GET `/api/dashboard/stats` - Get dashboard statistics (protected)

## Environment Variables

Create `server/.env` file with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
