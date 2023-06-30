import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ListaCategorias() {
  const { id } = useParams();
  const [categorias, setcategorias] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/categorias/${id}`)
      .then((respuesta) => {
        if (respuesta.data.Estatus === "EXITOSO") {
          setcategorias(respuesta.data.Resultado);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      <div className="d-flex flex-wrap gap-2 mt-4 justify-content-center">
      {categorias.map((categoria, index) => {
        return (
          <>
            <div className="card w-25 p-3" key={categoria.id_categoria}>
              <div className="card-body text-center">
                <img
                  src={require("../imagenes/"+categoria.portada)}
                  className="card-img-top"
                  alt="..."
                />
                <h5 className="card-title">{categoria.nombre_categoria}</h5>
                <p className="card-text">{categoria.descripcion}</p>
                <Link
                  to={"/asesorias/" + categoria.division}
                  className="btn btn-primary"
                >
                  Ver cursos
                </Link>
              </div>
            </div>
          </>
        );
      })}
      </div>
    </>
  );
}
