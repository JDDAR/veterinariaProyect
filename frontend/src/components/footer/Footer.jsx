import React from "react";
import { NavLink } from "react-router-dom";
import whatsapp from "../../pages/img/whatsapp.png";
import instagram from "../../pages/img/instagram.png";
import ubicacion from "../../pages/img/ubicacion.png";
import "../../styles/componets/__Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 content">
            <h2>Enlaces</h2>
            <hr className="hr-style" />
            <ul className="me-auto mb-2 mb-lg-0nav justify-content-end enlaces">
              <li className="nav-link ">
                <a href="#inicio">Inicio</a>
              </li>
              <li className="nav-link ">
                <a href="#servicios">Servicios</a>
              </li>
              <li className="nav-link ">
                <a href="#inisesion">Inicio sesión</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-4 content">
            <h2>Información</h2>
            <hr className="hr-style" />
            <ul className="me-auto mb-2 mb-lg-0nav justify-content-end info">
              <li className="nav-link">
                <a href="#servicios">Terminos y Condiciones</a>
              </li>
              <li className="nav-link">
                <a href="#inisesion">Politicas de privacidad</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-4 content">
            <h2>Contacto</h2>
            <hr className="hr-style" />
            <div className="ubic">
              <li className="nav-link">
                <NavLink to="/">
                  <img src={whatsapp} alt="#" />
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/">
                  <img src={instagram} alt="#" />
                </NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/">
                  <img src={ubicacion} alt="#" />
                </NavLink>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
