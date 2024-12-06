import React from "react";
import HeaderNav from "../../components/header/HeaderNav";
import CreateUser from "../../components/profiles/CreateUser";
import NavProfile from "../../components/profiles/nav/NavProfile";

import { Outlet, Route, Routes } from "react-router-dom";
import CreateUserAdmin from "../../components/profiles/admin/CreateUserAdmin";
import ListUser from "../../components/profiles/admin/ListUser";

const AdminProfileLayout = () => {
  const navUserProfile = [
    { path: "createUser", label: "Crear usuario" },
    { path: "listUser", label: "Ver usuarios" },
  ];
  return (
    <>
      <HeaderNav />
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

const AdminProfile = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminProfileLayout />}>
          <Route path="createUser" element={<CreateUserAdmin />} />
          <Route path="listUser" element={<ListUser />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminProfile;
