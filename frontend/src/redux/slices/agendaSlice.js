import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axioInstance";

const initialState = {
  citas: [],
  loading: false,
  error: null,
};

const agendaSlice = createSlice({
  name: "agenda",
  initialState,
  reducers: {
    fetchCitasStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCitasSuccess: (state, action) => {
      state.citas = action.payload;
      state.loading = false;
    },
    fetchCitasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Exportando las acciones
export const { fetchCitasStart, fetchCitasSuccess, fetchCitasError } =
  agendaSlice.actions;

// Obtener citas por veterinario (utilizando el ID del veterinario)
export const fetchCitas = (id) => async (dispatch) => {
  dispatch(fetchCitasStart());
  console.log("id en el slice ", id);
  try {
    const response = await axiosInstance.get(`/api/citas/veterinario/${id}`);
    dispatch(fetchCitasSuccess(response.data.citas));
  } catch (error) {
    dispatch(fetchCitasError("Error al cargar las citas"));
  }
};

export default agendaSlice.reducer;
