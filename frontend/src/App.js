import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminProfile from "./components/profiles/AdminProfile";
import VeterinarioProfile from "./components/profiles/VeterinarioProfile";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FormUpdatePassword from "./components/login/FormUpdatePassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/*Rutas para el login *******/}
          <Route path="/login" element={<Login />} />
          <Route
            path="/adminProfile"
            element={
              <ProtectedRoute roleRequired="administrador">
                <AdminProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/veterinarioProfile"
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
