import React from "react";
import { NavLink } from "react-router-dom";
import Signin from "../components/login/LoginUser";

const Login = () => {
  return (
    <div>
      <h2>Login - Veterinaria</h2>
      <NavLink to="/">Inicio</NavLink>

      <Signin />
    </div>
  );
};

export default Login;
