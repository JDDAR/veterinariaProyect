import React from "react";
import Signin from "../components/login/LoginUser";
import HeaderNav from "../components/header/HeaderNav";

const Login = () => {
  return (
    <div>
      <HeaderNav />
      <div className="container">
        <div className="containerForms">
          <Signin />
        </div>
      </div>
    </div>
  );
};

export default Login;
