import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  messageSave: '',
  data: []
};

export const historialSlice = createSlice({
  name: 'historial',
  initialState,
  reducers: {
    startSaving: (state) => {
      state.isSaving = true;
      state.messageSave = '';
    },
    savingSuccess: (state, action) => {
      state.isSaving = false;
      state.messageSave = action.payload;
    },
    savingFailure: (state, action) => {
      state.isSaving = false;
      state.messageSave = action.payload;
    },
    addCityToHistorial: (state, action) => {
      state.data.push(action.payload);
    },
    setHistorialData: (state, action) => {
      state.data = action.payload;
    }
  }
});

// Exportar las acciones generadas por createSlice
export const { 
  startSaving, 
  savingSuccess, 
  savingFailure, 
  addCityToHistorial, 
  setHistorialData 
} = historialSlice.actions;

// Exportar el reducer para usar en el store
export default historialSlice.reducer;
