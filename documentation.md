# Travel Agency Application Documentation

## Table of Contents
1. [Introduction]
2. [Architecture Overview]
3. [Frontend](#frontend)
   - [Setup and Configuration]
   - [Component Structure]
   - [Pages](#pages)
   - [State Management]
   - [API Integration]
   - [Styling and UI]
4. [Backend]
   - [Server Setup]
   - [API Routes]
   - [Database Models](#database-models)
   - [Data Validation](#data-validation)
5. [Data Flow](#data-flow)
6. [Deployment Guide](#deployment-guide)
7. [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)
8. [Future Enhancements](#future-enhancements)

## Introduction

The Travel Agency Application is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to browse travel packages, view package details, make bookings, and manage their travel plans.

Key features include:
- Browse available travel packages
- View detailed information about each package
- Create new travel packages (admin functionality)
- Book travel packages with customized options
- View booking history and details

## Architecture Overview

The application follows a client-server architecture:

- **Frontend**: React application built with Vite, using React Router for navigation and Tailwind CSS for styling
- **Backend**: Node.js with Express.js providing RESTful API endpoints
- **Database**: MongoDB for data storage with Mongoose as the ODM (Object Document Mapper)
- **API Communication**: Axios for HTTP requests between frontend and backend

## Frontend

### Frontend Setup and Configuration

The frontend is built using Vite as the build tool and development server. Key configuration files include:

- **vite.config.js**: Vite configuration including React plugin setup
- **tailwind.config.js**: Tailwind CSS configuration with custom color palette
- **package.json**: Dependencies and scripts for the frontend application
- **eslint.config.js**: ESLint configuration for code quality

### Component Structure

The application follows a component-based architecture with the following structure:

- **Layout Components**: General-purpose components like Navbar and Footer
- **Page Components**: Full pages that correspond to different routes
- **UI Components**: Reusable elements across multiple pages

#### Core Components

- **Navbar.jsx**: Main navigation component present on all pages
- **Footer.jsx**: Footer component with contact information and links

### Pages

The application includes the following main pages:

1. **Home.jsx**: Landing page with featured packages and call-to-action sections
2. **PackagesList.jsx**: Displays all available travel packages in a grid layout
3. **PackageDetails.jsx**: Shows detailed information about a specific package
4. **CreatePackage.jsx**: Form to create a new travel package
5. **BookingsList.jsx**: Displays all bookings made by users
6. **CreateBooking.jsx**: Form to book a specific travel package
7. **NotFound.jsx**: 404 page for handling invalid routes

### State Management

The application uses React's built-in state management with:

- **useState**: For component-level state management
- **useEffect**: For side effects like data fetching
- **React Router's hooks**: For navigation and route parameter access

### API Integration

API communication is handled through custom utility functions in `src/utils/api.js`, which provides:

- **getPackages**: Fetch all travel packages
- **getPackageById**: Fetch a specific package by ID
- **createPackage**: Create a new travel package
- **getBookings**: Fetch all bookings
- **createBooking**: Create a new booking

### Styling and UI

The application uses Tailwind CSS for styling with:

- Custom color palette defined in tailwind.config.js
- Responsive design for all screen sizes
- Custom component classes for buttons, cards, and form inputs
- Consistent styling across all pages

## Backend

### Server Setup

The backend server is built with Express.js, with the main setup in `server.js`. Key features include:

- CORS middleware for handling cross-origin requests
- JSON body parsing for request data
- MongoDB connection using Mongoose
- Error handling middleware
- Environment variable configuration with dotenv

### API Routes

The API provides RESTful endpoints organized by resource:

#### Packages Routes (`routes/packages.js`)

- **GET /api/packages**: Get all packages
- **GET /api/packages/:id**: Get a single package by ID
- **POST /api/packages**: Create a new package
- **PUT /api/packages/:id**: Update an existing package
- **DELETE /api/packages/:id**: Delete a package

#### Bookings Routes (`routes/bookings.js`)

- **GET /api/bookings**: Get all bookings
- **GET /api/bookings/:id**: Get a single booking by ID
- **POST /api/bookings**: Create a new booking
- **PUT /api/bookings/:id**: Update an existing booking
- **DELETE /api/bookings/:id**: Delete a booking

### Database Models

The application uses Mongoose models to define the database schema:

#### Package Model (`models/Package.js`)

Fields include:
- title (String)
- destination (String)
- price (Number)
- duration (Number)
- description (String)
- imageUrl (String)

#### Booking Model (`models/Booking.js`)

Fields include:
- name (String)
- email (String)
- selectedPackage (Reference to Package)
- date (Date)
- guests (Number)
- totalPrice (Number)

### Data Validation

Data validation is implemented at multiple levels:

- **Frontend**: Form validation with required fields and proper data types
- **Backend**: Mongoose schema validation for database operations
- **API**: Input validation and error handling in route handlers

## Data Flow

1. **User Interaction**: User interacts with the frontend UI
2. **API Request**: Frontend sends request to backend API using Axios
3. **Server Processing**: Backend processes request, interacts with database
4. **Response**: Backend sends response back to frontend
5. **State Update**: Frontend updates component state with received data
6. **UI Rendering**: Updated state triggers re-render of UI components

Example flow for booking creation:
1. User fills booking form with personal details and travel preferences
2. Form submission triggers API call to create booking
3. Backend calculates total price based on package price and number of guests
4. New booking is saved to database with reference to the selected package
5. Success response redirects user to bookings list page
6. Bookings list page fetches and displays all bookings including the new one

## Deployment Guide

### Frontend Deployment

1. Build the production version:
   ```
   cd frontend
   npm run build
   ```
2. Deploy the contents of the `dist` folder to a static hosting service (Netlify, Vercel, etc.)

### Backend Deployment

1. Set up environment variables on the hosting platform
2. Deploy the Node.js application to a service like Heroku, Railway, or DigitalOcean
3. Ensure MongoDB connection string is correctly configured for production

## Common Issues and Troubleshooting

### Frontend Issues

- **API Connection Errors**: Check if backend URL is correctly configured in api.js
- **Route Problems**: Ensure all routes are correctly defined in App.jsx
- **Styling Inconsistencies**: Verify Tailwind classes are correctly applied

### Backend Issues

- **Database Connection**: Verify MongoDB connection string and credentials
- **Missing Data**: Check model validation and required fields
- **Performance Issues**: Consider adding indexes to frequently queried fields

## Future Enhancements

Potential improvements for the application:

1. **User Authentication**: Add login/registration functionality
2. **Admin Dashboard**: Create an admin interface for managing packages and bookings
3. **Payment Integration**: Add payment processing for bookings
4. **Search and Filter**: Enhance package browsing with search and filtering options
5. **Reviews and Ratings**: Allow users to rate and review travel experiences
6. **Email Notifications**: Send confirmation emails for bookings
7. **Responsive Images**: Implement better image handling with responsive sizes
8. **Internationalization**: Add support for multiple languages