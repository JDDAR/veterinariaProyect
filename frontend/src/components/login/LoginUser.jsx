import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import axiosInstance from "../../api/axioInstance";
import { signinScheme } from "../../schemes/signinScheme";

const initialValues = {
  email: "",
  password: "",
};

const Signin = () => {
  const onSubmit = async (values) => {
    try {
      const response = await axiosInstance.post("/api/signin", values);
      console.log("Inicio de sesion exitoso", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Error al iniciar session: ", error);
    }
  };

  return (
    <>
      <div className="container">
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
