import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getPackages = async () => {
  try {
    const response = await api.get('/packages');
    return response.data;
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
};

export const getPackageById = async (id) => {
  try {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error;
  }
};

export const createPackage = async (packageData) => {
  try {
    const response = await api.post('/packages', packageData);
    return response.data;
  } catch (error) {
    console.error('Error creating package:', error);
    throw error;
  }
};

export const getBookings = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};