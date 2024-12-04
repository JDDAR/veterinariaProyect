import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axioInstance";

const initialState = {
  mascotas: [],
  loading: false,
  error: null,
};

const mascotasSlice = createSlice({
  name: "mascotas",
  initialState,
  reducers: {
    fetchMascotasStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMascotasSuccess: (state, action) => {
      state.mascotas = action.payload;
      state.loading = false;
    },
    fetchMascotasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Exportando las acciones
export const { fetchMascotasStart, fetchMascotasSuccess, fetchMascotasError } =
  mascotasSlice.actions;

// Acción para obtener mascotas por documento de usuario
export const fetchMascotas = (documento) => async (dispatch) => {
  dispatch(fetchMascotasStart());

  try {
    console.log("El id desde el front :", documento);
    const response = await axiosInstance.get(
      `/api/mascotasCliente?documento=${documento}`,
    );
    dispatch(fetchMascotasSuccess(response.data.mascotas));
  } catch (error) {
    dispatch(fetchMascotasError("Error al cargar las mascotas"));
  }
};

export default mascotasSlice.reducer;
