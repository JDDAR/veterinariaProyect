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
      </div>
    </>
  );
};

export default Home;
