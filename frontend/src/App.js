import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./paginas/Inicio";
import Asesorias from "./paginas/Asesorias"
import Categorias from "./paginas/Categorias"


import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Asesores from "./paginas/Asesores";

function App() {

  return (
    // <Inicio/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio/>}></Route>
        <Route path="/asesores" element={<Asesores/>}></Route>
        <Route path="/categorias/:id" element={<Categorias/>}></Route>
        <Route path="/asesorias/:id" element={<Asesorias/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
