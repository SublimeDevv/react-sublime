import "bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./paginas/Inicio";
import Asesorias from "./paginas/Asesorias"
import Categorias from "./paginas/Categorias"
import Crear from './paginas/Registro'
import IniciarSesion from './paginas/IniciarSesion'
import RegistrarAsesor from './paginas/RegistrarAsesor'



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
        <Route path="/Registrarse" element={<Crear/>}></Route>
        <Route path="/IniciarSesion" element={<IniciarSesion/>}></Route>
        <Route path="/RegistrarAsesor" element={<RegistrarAsesor/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
