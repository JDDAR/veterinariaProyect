import React from "react";
import NavProfile from "../../components/profiles/nav/NavProfile";
import { Outlet, Route, Routes } from "react-router-dom";
import CreateUser from "../../components/profiles/CreateUser";
import FilterClientes from "../../components/profiles/veterinario/FilterClientes";
import Agenda from "../../components/profiles/veterinario/Agenda";
import FilterHistorial from "../../components/profiles/veterinario/FilterHistorial";

const VeterinarioProfileLayout = () => {
  const navUserProfile = [
    { path: "agenda", label: "Agenda" },
    { path: "pacientes", label: "Pacientes" },
    { path: "citas", label: "Citas" },
    { path: "historial", label: "Historial Clinico" },
  ];
  return (
    <>
      <div className="container">
        <div className="containerContent">
          <NavProfile links={navUserProfile} />

          <div className="contentProfile">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

const VeterinarioProfile = () => {
  return (
    <Routes>
      <Route path="/" element={<VeterinarioProfileLayout />}>
        <Route path="agenda" element={<Agenda />} />
        <Route path="pacientes" element={<CreateUser />} />
        <Route path="citas" element={<FilterClientes />} />
        <Route path="historial" element={<FilterHistorial />} />
      </Route>
    </Routes>
  );
};

export default VeterinarioProfile;
