import React from "react";
import Encabezado from "../componentes/Encabezado";
import Division from "../componentes/Division";
export default function Inicio() {
  return (
    <div>
      <Encabezado />
      <div className="container">
        <Division />
      </div>
    </div>
  );
}
