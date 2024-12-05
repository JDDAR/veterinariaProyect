import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "./Footer"
import Menu from "../components/header/Menu"

const Home = () => {
  return (
    <div>
      <Menu />
      <h2>Home - Veterinaria</h2>
      <NavLink to="/login">Iniciar Sesión</NavLink>
      <p>Aqui esto es una prueba nada mas jajajasijasndc</p>
      <Footer />
    </div>
    
  );
};

export default Home;
