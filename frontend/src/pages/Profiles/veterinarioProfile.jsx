import React from "react";
import NavProfile from "../../components/profiles/nav/NavProfile";
import { Outlet, Route, Routes } from "react-router-dom";
import CreateUser from "../../components/profiles/CreateUser";
import FilterClientes from "../../components/profiles/veterinario/FilterClientes";

const VeterinarioProfileLayout = () => {
  const navOwner = [
    { path: "inicio", label: "inicio" },
    { path: "pacientes", label: "Pacientes" },
    { path: "citas", label: "Citas" },
  ];
  return (
    <>
      <div className="container">
        <div className="containerContent">
          <NavProfile links={navOwner} />

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
        <Route path="pacientes" element={<CreateUser />} />
        <Route path="citas" element={<FilterClientes />} />
      </Route>
    </Routes>
  );
};

export default VeterinarioProfile;
