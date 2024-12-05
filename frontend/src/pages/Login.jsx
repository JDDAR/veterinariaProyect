import React from "react";
import Signin from "../components/login/LoginUser";
import HeaderNav from "../components/header/HeaderNav";
import Footer from "../components/footer/Footer";

const Login = () => {
  return (
    <div>
      <HeaderNav />
      <Signin />
      <Footer />
    </div>
  );
};

export default Login;
