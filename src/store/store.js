import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { historialSlice } from './historial/historialSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    historial: historialSlice.reducer,
  },
})
