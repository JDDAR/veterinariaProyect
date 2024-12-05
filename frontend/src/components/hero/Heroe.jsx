import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/componets/__Heroe.scss";

const Hereo = () => {
  return (
    <div className="heroes">
      <section className="hero">
        <div className="hero-text">
          <h1>Todo para tu mascota</h1>
          <p>Descubre nuestras ofertas y servicios exclusivos.</p>
          <NavLink to="/Servicios" className="cta-button">
            Conoce más
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Hereo;
