import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
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

  const onSubmit = async (values) => {
    try {
      const response = await axiosInstance.post("/api/signin", values);
      const { token, role, user } = response.data;
      console.log(role);

      dispatch(loginSuccess({ token, role, user }));

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
