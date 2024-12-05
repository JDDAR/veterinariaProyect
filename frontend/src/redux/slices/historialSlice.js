import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axioInstance";

const initialState = {
  historial: [],
  loading: false,
  error: null,
};

const historialSlice = createSlice({
  name: "historial",
  initialState,
  reducers: {
    fetchHistorialStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchHistorialSuccess: (state, action) => {
      state.historial = action.payload;
      state.loading = false;
    },
    fetchHistorialError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Exportando las acciones
export const {
  fetchHistorialStart,
  fetchHistorialSuccess,
  fetchHistorialError,
} = historialSlice.actions;

// Acción para obtener el historial de una mascota específica
export const fetchHistorial = (mascotaId) => async (dispatch) => {
  dispatch(fetchHistorialStart());
  try {
    const response = await axiosInstance.get(
      `/api/historial?mascotaId=${mascotaId}`,
    );
    dispatch(fetchHistorialSuccess(response.data.historiales));
  } catch (error) {
    dispatch(fetchHistorialError("Error al cargar el historial"));
  }
};

export default historialSlice.reducer;
