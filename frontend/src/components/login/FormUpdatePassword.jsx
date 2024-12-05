import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import axiosInstance from "../../api/axioInstance";
import { updatePasswordScheme } from "../../schemes/updatePasswordScheme";

const FormUpdatePassword = () => {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const response = await axiosInstance.put("/api/updatePassword", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      alert(response.data.message || "Contraseña cambiada exitosamente");
      resetForm();
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: "Error del servidor, intenta nuevamente" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2>Cambiar contraseña</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={updatePasswordScheme}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form autoComplete="off">
            {errors.server && (
              <div className="alert alert-danger">{errors.server}</div>
            )}

            <fieldset>
              <label htmlFor="currentPassword">Contraseña Actual</label>
              <Field
                name="currentPassword"
                type="password"
                className={
                  errors.currentPassword && touched.currentPassword
                    ? "errorInput"
                    : ""
                }
              />
              <ErrorMessage
                name="currentPassword"
                component="p"
                className="errorInput"
              />
            </fieldset>

            <fieldset>
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <Field
                name="newPassword"
                type="password"
                className={
                  errors.newPassword && touched.newPassword ? "errorInput" : ""
                }
              />
              <ErrorMessage
                name="newPassword"
                component="p"
                className="errorInput"
              />
            </fieldset>

            <fieldset>
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <Field
                name="confirmPassword"
                type="password"
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "errorInput"
                    : ""
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="errorInput"
              />
            </fieldset>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? "Cambiando..." : "Cambiar Contraseña"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormUpdatePassword;
