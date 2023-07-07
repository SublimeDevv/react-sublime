import express from "express";
import mysql from "mysql";
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express();
app.use(cors())
app.use(express.json());

const conexion = mysql.createConnection({
  server: "localhost",
  user: "root",
  password: "",
  database: "asesorias",
});

conexion.connect(function (error) {
  if (error) {
    console.log("No fue posible la conexión");
  } else {
    console.log("¡Conectado al servidor!");
  }
});

app.listen(8081, () => {
  console.log("Servidor iniciado");
});

app.get('/asesorias/:id', (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT * FROM asesorias INNER JOIN categorias ON id_categoria = categoria WHERE division = ?";
  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      return respuesta.json([{ Error: "Error en la consulta" }]);
    }
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

app.get('/categorias/:id', (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT * FROM VW_Obtener_Categorias WHERE division = ?";

  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      return respuesta.json([{ Error: "Error en la consulta" }]);
    }
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

app.get('/obtenerDivisiones', (peticion, respuesta) => {
    const sql = "SELECT * FROM VW_Obtener_Divisiones";
    conexion.query(sql, (error, resultado) => {
        if (error) return respuesta.json({Error: "Error en la consulta"});
        return respuesta.json({Estatus: "EXITOSO", Resultado: resultado});
    });
});

app.post("/verificar", (peticion, respuesta) => {
  const { Correo } = peticion.body;
  const arrValores = [Correo];
  const sql =
    "SELECT * FROM VW_Obtener_Usuarios WHERE correo_electronico = ?";
  conexion.query(sql, arrValores, (error, resultado) => {
    if (error) return respuesta.json({ Error: "Error en la consulta" });
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

app.post("/login", (peticion, respuesta) => {
  const { Correo, Contrasenia } = peticion.body;
  const arrValores = [Correo, Contrasenia];
  const sql =
    "SELECT * FROM VW_Obtener_Usuarios WHERE correo_electronico = ? AND contrasenia = ?";
  conexion.query(sql, arrValores, (error, resultado) => {
    if (error) return respuesta.json({ Error: "Error en la consulta" });
    const token = jwt.sign({ correo: Correo }, "secreto");
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado, token });
  });
});

app.post("/registrarUsuario", (peticion, respuesta) => {
  const { Nombre, Apellidos, Correo, Contrasenia } = peticion.body;
  const query = "CALL SP_RegistrarUsuarios(?, ?, ?, ?)";
  conexion.query(query, [Nombre, Apellidos, Correo, Contrasenia], (error, resultado) => {
    if (error) {
      console.error("Error al registrar el usuario:", error);
      respuesta.status(500).json({ Error: "No se pudo añadir al usuario" });
    } else {
      const token = jwt.sign({ correo: Correo }, "secreto");
      respuesta.json({ Estatus: "EXITOSO", Resultado: resultado, token });
    }
});
});