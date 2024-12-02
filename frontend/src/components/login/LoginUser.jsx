import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axioInstance";
import { loginSuccess } from "../../redux/slices/userSlice";
import { signinScheme } from "../../schemes/signinScheme";

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
        user,
        updatePasswordRequired: updateRequired,
      } = response.data;
      console.log(role);

      if (updateRequired) {
        setUpdatePasswordRequired(true);
        console.log("Se requiere actualización de contraseña");
        return; // Detener el flujo aquí
      }

      dispatch(loginSuccess({ token, role, user }));

      console.log(
        "Token guardado en localStorage:",
        localStorage.getItem("token"),
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
      <div className="container">
        {updatePasswordRequired && (
          <div className="alert alert-warning">
            <p>Debes cambiar tu contraseña antes de continuar.</p>
            <button onClick={formUpdatePassword} className="btn btn-primary">
              Cambiar contraseña
            </button>
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={signinScheme}
          onSubmit={onSubmit}
        >
          <Form autoComplete="on">
            <fieldset>
              <label htmlFor="email">Correo</label>
              <Field name="email" type="email" id="email" autoFocus />
              <ErrorMessage name="email" component="p" className="errorInput" />
            </fieldset>
            <fieldset>
              <label htmlFor="password">Contraseña</label>
              <Field name="password" type="password" id="password" />
              <ErrorMessage
                name="password"
                component="p"
                className="errorInput"
              />
            </fieldset>
            <button type="submit">Ingresar</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Signin;
