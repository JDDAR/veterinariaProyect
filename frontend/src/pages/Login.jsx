import React from "react";
import { NavLink } from "react-router-dom";
import Signin from "../components/login/LoginUser";
import HeaderNav from "../components/header/HeaderNav";

const Login = () => {
  return (
    <div>
      <HeaderNav />
      <div className="container">
        <h2>Login - Veterinaria</h2>
        <NavLink to="/">Inicio</NavLink>
        <Signin />
      </div>
    </div>
  );
};

export default Login;
