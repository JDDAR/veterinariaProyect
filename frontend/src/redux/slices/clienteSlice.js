import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axioInstance";

const initialState = {
  cliente: [],
  loading: false,
  error: null,
};

const clienteSlice = createSlice({
  name: "clientes",
  initialState,
  reducers: {
    fetchClientesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchClientesSuccess: (state, action) => {
      state.cliente = action.payload;
      state.loading = false;
    },
    fetchClientesError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

//Exportando las acciones
export const { fetchClientesSuccess, fetchClientesStart, fetchClientesError } =
  clienteSlice.actions;

//Obteniendo clientes :
export const fetchClientes = (documento) => async (dispatch) => {
  dispatch(fetchClientesStart());
  try {
    const response = await axiosInstance.get("/api/filterClientes", {
      params: documento ? { documento } : undefined,
    });
    dispatch(fetchClientesSuccess(response.data));
  } catch (error) {
    dispatch(
      fetchClientesError(
        error.response?.data?.error || "Error al cargar los clientes",
      ),
    );
  }
};
export default clienteSlice.reducer;
