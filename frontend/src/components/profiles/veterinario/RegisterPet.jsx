import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import axiosInstance from "../../../api/axioInstance";
import { useSelector } from "react-redux";
import createPetSchema from "../../../schemes/createPetsScheme";

// Valores iniciales del formulario
const initialValues = {
  namePet: "",
  fechaNacimientoPet: "",
  estadoPet: "",
  idEspeFk: "", // Es opcional
  idUserFk: "", // Se relaciona con el cliente
};

const RegisterPet = ({ clientId }) => {
  const tokenUser = useSelector((state) => state.user.token);

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axiosInstance.post("/api/createPet", {
        ...values,
        idUserFk: clientId,
      });
      alert("Mascota registrada con éxito", response.data);
      resetForm();
    } catch (error) {
      console.error("Error al registrar la mascota:", error);
      alert("Error al registrar la mascota");
    }
  };

  return (
    <>
      <div className="FormRegisterPet formPrimary">
        <h4>Registrar Mascota</h4>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={createPetSchema}
        >
          <Form>
            <div className="containerInput">
              <fieldset>
                <label htmlFor="namePet">Nombre de la Mascota</label>
                <Field name="namePet" type="text" id="namePet" />
                <ErrorMessage
                  name="namePet"
                  component="p"
                  className="errorInput"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="fechaNacimientoPet">Fecha de Nacimiento</label>
                <Field
                  name="fechaNacimientoPet"
                  type="date"
                  id="fechaNacimientoPet"
                />
                <ErrorMessage
                  name="fechaNacimientoPet"
                  component="p"
                  className="errorInput"
                />
              </fieldset>
            </div>

            <div className="containerInput">
              <fieldset>
                <label htmlFor="estadoPet">Estado de la Mascota</label>
                <Field name="estadoPet" type="text" id="estadoPet" />
                <ErrorMessage
                  name="estadoPet"
                  component="p"
                  className="errorInput"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="idEspeFk">ID de Especie (Opcional)</label>
                <Field name="idEspeFk" type="text" id="idEspeFk" />
                <ErrorMessage
                  name="idEspeFk"
                  component="p"
                  className="errorInput"
                />
              </fieldset>
            </div>

            <button type="submit">Registrar Mascota</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default RegisterPet;
