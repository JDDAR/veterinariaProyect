import React from "react";
import logoHeader from "../../pages/img/logo-dark.png";
import { NavLink } from "react-router-dom";
import "../../styles/componets/__HeaderNav.scss";

const HeaderNav = ({ nombre }) => {
  return (
    <div className="">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <NavLink className="navbar-brand menu" to="/">
            <img
              src={logoHeader}
              alt=""
              className="d-inline-block align-text-top logo"
            />{" "}
            <h1 className="site-title"> Clauw </h1>{" "}
            <span className="my-span"> Guardians </span>
          </NavLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NavLink className="nav-link item" aria-current="page" to="/">
                  Inicio
                </NavLink>
              </li>

              <li class="nav-item dropdown">
                <NavLink className="nav-link item" to="/servicios">
                  Servicios
                </NavLink>
              </li>
            </ul>
            <div class="d-flex" role="search">
              <NavLink class="btn btn-dark" to="/login">
                <button class="btn btn-dark"> Inicio Sesión</button>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderNav;
