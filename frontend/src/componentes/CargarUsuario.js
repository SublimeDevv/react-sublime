import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import sw from "sweetalert";

export default function CrearUsuario() {
  const navigate = useNavigate();
  useEffect(() => {
    const verificarSesion = localStorage.getItem("autenticado");
    if (verificarSesion) {
      navigate("/");
    }
  }, [navigate]);

const [body, setBody] = useState({
  Correo: "",
  Contrasenia: ""
});

const cambioEntrada = ({ target }) => {
  const { name, value } = target;
  setBody({ ...body, [name]: value });
};

const Enviar = async () => {
  if (!body.Correo.length || !body.Contrasenia) {
      return sw({ icon: 'warning', title: '¡Oops!', text: 'Debes rellenar todos los campos.' })  
  }

  const verificarCorreo = await axios.post("http://localhost:8081/verificar", {
      Correo: body.Correo
  });


  const passcor = verificarCorreo.data.Resultado[0];
  console.log(passcor)
  if (passcor && passcor.contrasenia !== body.Contrasenia) return sw({ icon: 'error', title: 'Error', text: 'Contraseña incorrecta.' });

  try {
    const response = await axios.post("http://localhost:8081/login", body);
    const resultado = response.data.Resultado;
    console.log("RESULTADO"+resultado)
    if (resultado.length > 0) {
      navigate("/");
      localStorage.setItem("autenticado", true);
    } else {
      sw({ icon: 'error', title: 'Error', text: 'El correo que ingresaste no existe...' })  
    }
  } catch (error) {
    console.log("Error en el inicio de sesión: " + error);
  }
};
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Iniciar Sesión
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            value={body.Correo}
                            onChange={cambioEntrada}
                            name="Correo"
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example3c">
                            Correo electronico
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            placeholder="Debe tener almenos 8 caracteres"
                            value={body.Contrasenia}
                            onChange={cambioEntrada}
                            name="Contrasenia"
                            id="form3Example4c"
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example4c">
                            Contraseña
                          </label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                        />
                        <label className="form-check-label" for="form2Example3">
                          Acepto los terminos y condiciones{" "}
                          <a href="#!">Terminos y condiciones</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={Enviar}
                        >
                          Iniciar Sesión
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={require("../imagenes/logo-pia.png")}
                      className="inverted-image"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
