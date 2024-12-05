import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "../components/footer/Footer";
import HeaderNav from "../components/header/HeaderNav";
import Heroe from "../components/hero/Heroe";

const Home = () => {
  return (
    <div>
      <HeaderNav />
      <Heroe />
      <Footer />
    </div>
  );
};

export default Home;
