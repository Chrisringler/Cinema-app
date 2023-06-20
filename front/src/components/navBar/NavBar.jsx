import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = ({ isAuthenticated, handleLogout }) => {
  return (
    <div className={style.mainConteiner}>
      <Link className={style.link} to="/">
        <h1>Cinema</h1>
      </Link>
      {isAuthenticated && (
        <>
          <Link className={style.link} to="/create">
            Agregar Película
          </Link>
          <Link className={style.link} to="/lista">
            Subir lista de películas
          </Link>
          <button className={style.button} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </>
      )}
      {!isAuthenticated && (
        <Link className={style.link} to="/login">
          Iniciar Sesión
        </Link>
      )}
    </div>
  );
};

export default NavBar;
