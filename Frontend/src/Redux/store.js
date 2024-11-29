// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';  // Import the authSlice
import farmerReducer from './slices/farmerSlice';  // Example for other slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    //farmer: farmerReducer,  // Add other reducers as needed
  },
});

export default store;
