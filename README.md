# Travel Agency MERN Stack Application

A simple travel agency application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to view travel packages, book trips, and manage bookings.

## Features

- Browse and search travel packages
- View detailed information about each package
- Book travel packages
- View all bookings
- Create new travel packages

## Tech Stack

**Frontend:**
- React with Vite
- React Router for client-side routing
- Tailwind CSS for styling
- Axios for API requests

**Backend:**
- Node.js and Express
- MongoDB with Mongoose
- RESTful API architecture

## Setup and Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd travel-agency/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/travel-agency
   ```
   Note: If you're using MongoDB Atlas, replace the MONGO_URI with your connection string.

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd travel-agency/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173` to view the application.

## Application Structure

```
travel-agency/
├── backend/               # Backend code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── server.js          # Express server setup
│
└── frontend/              # Frontend code
    ├── public/            # Static files
    ├── src/               # React components and logic
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   ├── utils/         # Utility functions
    │   ├── App.jsx        # Main app component
    │   └── main.jsx       # Entry point
    ├── index.html         # HTML template
    ├── package.json       # Frontend dependencies
    └── tailwind.config.js # Tailwind CSS configuration
```

## API Endpoints

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get package by ID
- `POST /api/packages` - Create a new package
- `PUT /api/packages/:id` - Update a package
- `DELETE /api/packages/:id` - Delete a package

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/:id` - Update a booking
- `DELETE /api/bookings/:id` - Delete a booking

## License

MIT