import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ListaAsesorias() {
  const { id } = useParams();
  const [asesorias, setAsesorias] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/asesorias/${id}`)
      .then((respuesta) => {
        if (respuesta.data.Estatus === "EXITOSO") {
          setAsesorias(respuesta.data.Resultado);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      <div className="d-flex flex-wrap gap-2 mt-4 justify-content-center">

      {asesorias.map((asesoria, index) => {
        return (
          <>
            <div className="card w-25 p-3" key={asesoria.id_asesoria}>
              <div className="card-body text-center">
                <img
                  src={require("./../imagenes/sin-portada.jpg")}
                  className="card-img-top"
                  alt="..."
                />
                <h5 className="card-title">{asesoria.nombre_asesoria}</h5>
                <p className="card-text">{asesoria.descripcion}</p>
                <button className="btn btn-primary">Inscriberse</button>
              </div>
            </div>
          </>
        );
      })}
      </div>
    </>
  );
}
