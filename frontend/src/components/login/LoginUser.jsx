import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axioInstance";
import { loginSuccess } from "../../redux/slices/userSlice";
import { signinScheme } from "../../schemes/signinScheme";
import "../../styles/componets/login/__LoginUser.scss";

const initialValues = {
  email: "",
  password: "",
};

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatePasswordRequired, setUpdatePasswordRequired] = useState(false);

  const onSubmit = async (values) => {
    try {
      const response = await axiosInstance.post("/api/signin", values);
      const {
        token,
        role,
        id,
        user,
        updatePasswordRequired: updateRequired,
      } = response.data;
      console.log(role);
      console.log(id);

      if (updateRequired) {
        setUpdatePasswordRequired(true);
        console.log("Se requiere actualización de contraseña");
        return; // Detener el flujo aquí
      }

      dispatch(loginSuccess({ token, role, user, id }));

      console.log(
        "Token guardado en localStorage:",
        localStorage.getItem("token")
      );
      switch (role) {
        case "administrador":
          navigate("/adminProfile");
          break;
        case "veterinario":
          navigate("/veterinarioProfile");
          break;
        default:
          console.log("Error al direccionar por el rol ");
          break;
      }
    } catch (error) {
      console.error("Error al iniciar session: ", error);
    }
  };

  const formUpdatePassword = () => {
    navigate("/updatePassword");
  };

  return (
    <>
      <div className="container" id="container">
        {updatePasswordRequired && (
          <div className="alert alert-warning">
            <button onClick={formUpdatePassword} className="btn btn-primary">
              Cambiar contraseña
            </button>
          </div>
        )}
        <div className="form-container sign-in">
          <form>
            <h1>Inicio Sesión</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={signinScheme}
              onSubmit={onSubmit}
            >
              <Form className="containerForm__formPrimary" autoComplete="on">
                <fieldset>
                  <Field
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Correo"
                    autoFocus
                    required
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="errorInput"
                  />
                </fieldset>
                <fieldset>
                  <Field
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                    required
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="errorInput"
                  />
                </fieldset>
                <NavLink to="/">¿Olvidaste tu contraseña?</NavLink>
                <button className="btn btn-outline-light hidden2" type="submit">
                  Inicio Sesión
                </button>
              </Form>
            </Formik>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h1 className="letra">Hola!</h1>
              <p>
                Regístrese con sus datos personales para utilizar todas las
                funciones del sitio{" "}
              </p>
              <NavLink className="btn btn-outline-light hidden" to="/">
                Registrar
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
