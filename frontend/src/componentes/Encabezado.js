import React from "react";
import "../estilos/Encabezado.css";
import { Link } from "react-router-dom";

export default function Encabezado() {
  return (
    <header className="p-3 text-black-50 bg-turquesa">
      <div className="container-fluid w-75 p-3">
        <div className="row align-items-end">
          <div className="col-3">
            <a href="/" className="text-white text-decoration-none">
              <img src={require("../imagenes/logo-pia.png")} alt="" className="logo" />
              <br />
              <span>Plataforma Integral de Asesorías</span>
            </a>
          </div>
          <nav className="col text-center">
            <ul className="nav ">
              <li className="align-middle">
                <Link to={"/"} className="nav-link px-2 text-white fs-5">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to={"/asesores"}
                  className="nav-link px-2 text-white fs-5"
                >
                  Asesores
                </Link>
              </li>

              <li>
                <a href="#" className="nav-link px-2 text-white fs-5">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white fs-5">
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
          <div className=" col-2 text-end align-middle">
            <Link to={'/IniciarSesion'}>
            <button type="button" className="btn btn-outline-light me-2 ">
              Acceso
            </button>
            </Link>
            
          <Link to={"/Registrarse"}>
          <button type="button" className="btn bg-marino text-white">
              Registro
            </button>

          </Link>
            
          </div>
        </div>
      </div>
    </header>
  );
}
