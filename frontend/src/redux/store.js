import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import clienteSlice from "./slices/clienteSlice";

import modalReducer from "./slices/modalSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    clientes: clienteSlice,
    modal: modalReducer,
  },
});

export default store;
