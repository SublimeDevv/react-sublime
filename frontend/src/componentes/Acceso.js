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
    Nombre: "",
    Apellidos: "",
    Correo: "",
    Contrasenia: "",
    ConfirmarContrasenia: "",
  });

  const cambioEntrada = ({ target }) => {
    const { name, value } = target;
    setBody({ ...body, [name]: value });
  };

  const Enviar = async () => {
    if (
      !body.Nombre.length ||
      !body.Apellidos.length ||
      !body.Correo.length ||
      !body.ConfirmarContrasenia.length
    ) {
      return sw({
        icon: "warning",
        title: "¡Oops!",
        text: "Debes rellenar todos los campos.",
      });
    }

    const verificarCorreo = await axios.post(
      "http://localhost:8081/verificar",
      {
        Correo: body.Correo,
      }
    );

    if (verificarCorreo.data.Resultado[0])
      return sw({
        icon: "error",
        title: "¡Oops!",
        text: "El correo que ingresaste ya existe.",
      });

    const correoRegex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/;
    const filtrarCaracteres = correoRegex.test(body.Correo);
    if (!filtrarCaracteres)
      return sw({
        icon: "error",
        title: "¡Oops!",
        text: "El correo que ingresaste no debe contener caracteres especiales y espacios en blancos.",
      });

    const contraseniaRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const comprobarContrasenia = contraseniaRegex.test(body.Contrasenia);
    if (!comprobarContrasenia)
      return sw({
        icon: "error",
        title: "¡Oops!",
        text: "La contraseña debe tener mínimo 8 caracteres, mayúsculas y minúsculas digitos y al menos un caracter especial(?=.*[@$!%*#?&])",
      });

    if (body.Contrasenia !== body.ConfirmarContrasenia)
      return sw({
        icon: "error",
        title: "¡Oops!",
        text: "Las contraseñas deben coincidir.",
      });
    try {
      await axios.post(
        "http://localhost:8081/registrarUsuario",
        {
          Nombre: body.Nombre,
          Apellidos: body.Apellidos,
          Correo: body.Correo,
          Contrasenia: body.Contrasenia,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
      localStorage.setItem("autenticado", true);
    } catch (error) {
      console.log("Error en registrar el usuario: " + error);
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
                      Registrate
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            value={body.Nombre}
                            onChange={cambioEntrada}
                            name="Nombre"
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example1c">
                            Nombre de usuario
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example3c"
                            value={body.Apellidos}
                            onChange={cambioEntrada}
                            name="Apellidos"
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example3c">
                            Apellidos
                          </label>
                        </div>
                      </div>

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

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            value={body.ConfirmarContrasenia}
                            onChange={cambioEntrada}
                            name="ConfirmarContrasenia"
                            id="form3Example4cd"
                            className="form-control"
                          />
                          <label className="form-label" for="form3Example4cd">
                            Confirmar contraseña
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
                          Registrar
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
