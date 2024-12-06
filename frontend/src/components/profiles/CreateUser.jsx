import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import createUserScheme from "../../schemes/createUserScheme";
import axiosInstance from "../../api/axioInstance";
import { useSelector } from "react-redux";

const initialValues = {
  tipoIdent: "",
  numberDocument: "",
  nameUser: "",
  lastNameUser: "",
  addressUser: "",
  telUser: "",
  email: "",
  idRolFk: "",
};

const CreateUser = () => {
  const tokenUser = useSelector((state) => state.user.token);

  const onSubmit = async (values, { resetForm }) => {
    try {
      console.log("TOOKEN....", tokenUser);
      const response = await axiosInstance.post("/api/registerUser", values);
      console.log("Usuario Creado Exitosamente ", response.data);
      alert("Usuario creado con éxito");
      resetForm();
    } catch (error) {
      console.error("Error al crear el usuario", error);
      alert("Error al crear el usuario");
    }
  };

  return (
    <>
      <h4>Crear Cliente</h4>
      <div className="FormCreateUser">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={createUserScheme}
        >
          <Form>
            <div className="containerInput">
              <fieldset>
                <label htmlFor="tipoIdent">Tipo de identidicación</label>
                <Field as="select" name="tipoIdent" id="tipoIdent">
                  <option value=""> Tipo</option>
                  <option value="cc">C.c</option>
                  <option value="ti">T.i</option>
                  <option value="extrangeria">Extrangeria</option>
                  <option value="otro">Otro</option>
                </Field>
                <ErrorMessage
                  name="tipoIdent"
                  component="p"
                  className="errorInput"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="numberDocument">Numero de identidad</label>
                <Field name="numberDocument" type="text" id="numberDocument" />
                <ErrorMessage
                  name="numberDocument"
                  component="p"
                  className="errorInput"
                />
              </fieldset>
            </div>
            <div className="containerInput">
              <fieldset>
                <label htmlFor="nameUser">Nombre del Usuario</label>
                <Field name="nameUser" type="text" id="nameUser" />
                <ErrorMessage
                  name="nameUser"
                  component="p"
                  className="errorInput"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="lastNameUser">Apellido del Usuario</label>
                <Field name="lastNameUser" type="text" id="lastNameUser" />
                <ErrorMessage
                  name="lastNameUser"
                  component="p"
                  className="errorInput"
                />
              </fieldset>
            </div>
            <div className="containerInput">
              <fieldset>
                <label htmlFor="addressUser">Direccion del usuario</label>
                <Field name="addressUser" type="text" id="addressUser" />
                <ErrorMessage
                  name="addressUser"
                  component="p"
                  className="errorInput"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="telUser">Telefono Contacto</label>
                <Field name="telUser" type="text" id="telUser" />
                <ErrorMessage
                  name="telUser"
                  component="p"
                  className="errorInput"
                />
              </fieldset>
              <div className="containerInput">
                <fieldset>
                  <label htmlFor="email"> Correo Usuario</label>
                  <Field name="email" type="email" id="email" />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="errorInput"
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="idRolFk">Rol Del usuario</label>
                  <Field as="select" name="idRolFk" id="idRolFk">
                    <option value="">Rol</option>
                    <option value="1">Cliente</option>
                  </Field>
                  <ErrorMessage
                    name="idRolFk"
                    component="p"
                    className="errorInput"
                  />
                </fieldset>
              </div>
            </div>
            <button type="submit">Registrar</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default CreateUser;
