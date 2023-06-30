import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";
import axios from "axios";

// 2.- creo que compontente

function Division() {
  const [divisiones, setDivisiones] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/obtenerDivisiones")
      .then((respuesta) => {
        if (respuesta.data.Estatus === "EXITOSO") {
          setDivisiones(respuesta.data.Resultado);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
    <div className="d-flex flex-wrap gap-2 mt-4 justify-content-center">

      {divisiones.map((division, index) => {
        return <>
        
      <div className="card w-25 p-3" key ={division.id_division}>
        <img src={require('../imagenes/' + division.portada)} className="card-img-top" alt="..." />
        <div className="card-body text-center">
          <h5 className="card-title">{division.nombre_division}</h5>
          <p className="card-text">{division.description}</p>
          <Link to={'/categorias/' + division.id_division} className="btn btn-primary">Ver categorías</Link>
        </div>
      </div>
        </>;
      })}
      </div>
    </>
  );
}
// 3.- componentes de clase
export default Division;
