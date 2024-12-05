import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminProfile from "./components/profiles/AdminProfile";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FormUpdatePassword from "./components/login/FormUpdatePassword";
import Modal from "./components/modals/Modal";
import VeterinarioProfile from "./pages/Profiles/veterinarioProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Modal />
        <Routes>
          <Route path="/" element={<Home />} />
          {/*Rutas para el login *******/}
          <Route path="/login" element={<Login />} />
          <Route
            path="/adminProfile/*"
            element={
              <ProtectedRoute roleReqnpuired="administrador">
                <AdminProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/veterinarioProfile/*"
            roleRequired="veterinario"
            element={
              <ProtectedRoute roleRequired="veterinario">
                <VeterinarioProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/updatePassword" element={<FormUpdatePassword />} />
          {/* Fin de rutas para login */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
