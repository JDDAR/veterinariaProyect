import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminProfile from "./pages/Profiles/AdminProfile";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FormUpdatePassword from "./components/login/FormUpdatePassword";
import Modal from "./components/modals/Modal";
import VeterinarioProfile from "./pages/Profiles/veterinarioProfile";
import Footer from "./components/footer/Footer";

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
              <ProtectedRoute roleRequired="administrador">
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
      <Footer />
    </>
  );
}

export default App;
