import express from "express";
import mysql from "mysql";
import cors from 'cors'

//Creamos la instancia de express
const app = express();
app.use(cors())
//Paso 3 Vamos a crear la conexión a la base de datos

const conexion = mysql.createConnection({
  server: "localhost",
  user: "root",
  password: "",
  database: "asesorias",
});

// 4 verificamos la conexión
conexion.connect(function (error) {
  if (error) {
    console.log("No fue posible la conexión");
  } else {
    console.log("¡Conectado al servidor!");
  }
});

// 5 Iniciamos el servidor

app.listen(8081, () => {
  console.log("Servidor iniciado");
});

app.get('/asesorias/:id', (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT * FROM asesorias WHERE division = ?";
  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      return respuesta.json([{ Error: "Error en la consulta" }]);
    }
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});


app.get('/categorias/:id', (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT nombre_categoria, division FROM asesorias INNER JOIN categorias ON id_categoria = categoria WHERE division = ?";

  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      return respuesta.json([{ Error: "Error en la consulta" }]);
    }
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});


//6 Obtener la lista de divisiones de la universidad 
app.get('/obtenerDivisiones', (peticion, respuesta) => {
    //6.1 consulta sql
    const sql = "SELECT * FROM divisiones WHERE estatus = 1";
    //6.2 Envio a la conexión
    conexion.query(sql, (error, resultado) => {
        // 6.3 compruebo el resultado
        console.log(error)
        if (error) return respuesta.json({Error: "Error en la consulta"});
        return respuesta.json({Estatus: "EXITOSO", Resultado: resultado});
    });
});

app.get('/asesorias/:id')

// Triggers, vistas y procedure

//GET Obtener información del servidor
//POST ENVIAR INFORMACIÓN A TRAVES DE HTTP
// PUT Y PATCH MODIFICAR INFORMACIÓN EN MI SERVIDOR DIFERENCIA ENTRE PATCH Y PUT
//DELETE ELIMINAR INFORMACIÓN