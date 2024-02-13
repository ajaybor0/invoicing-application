// Import necessary functions and slices from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authSliceReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer ,// API-related state reducer
     auth: authSliceReducer, // Authentication state reducer
  },

  // Add middleware to the Redux store
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware) // Add API middleware
});

// Export the configured Redux store for use in the application
export default store;
