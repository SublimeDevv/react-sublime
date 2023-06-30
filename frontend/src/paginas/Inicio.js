import React from "react";
import Encabezado from "../componentes/Encabezado";
import Division from "../componentes/Division";
export default function Inicio() {
  return (
    <div>
      <Encabezado />
      <h1>Bienvenidos a Juanito.com</h1>
      <div className="container">
        <Division />
      </div>
    </div>
  );
}
