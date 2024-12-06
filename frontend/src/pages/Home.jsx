import React from "react";
import { NavLink } from "react-router-dom";
import HeaderNav from "../components/header/HeaderNav";
import BgImage from "../img/BGHome.jpg";

const Home = () => {
  return (
    <>
      <HeaderNav />
      <div className="containerHome">
        <img src={BgImage} alt="" />
        <div className="containerHome__contentHome">
          <h2>Todo Para tu mascota</h2>
          <h3>Descubre nuestras ofertas y servicios exclusivos</h3>
          <NavLink to="/">Conoce mas</NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
