import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../api/axioInstance";
import { useDispatch } from "react-redux";
import { fetchCitas } from "../../../redux/slices/agendaSlice";

const HistorialPaciente = ({ cita }) => {
  const dispatch = useDispatch();

  const initialValues = {
    descripcionHistorial: "",
    estadoHistorial: "Activo",
    notas: [
      {
        tituloNota: "",
        descripcionNota: "",
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    descripcionHistorial: Yup.string()
      .required("La descripción general es obligatoria")
      .min(10, "La descripción debe tener al menos 10 caracteres"),
    estadoHistorial: Yup.string().required("El estado es obligatorio"),
    notas: Yup.array().of(
      Yup.object().shape({
        tituloNota: Yup.string()
          .required("El título de la nota es obligatorio")
          .min(3, "El título debe tener al menos 3 caracteres"),
        descripcionNota: Yup.string()
          .required("La descripción de la nota es obligatoria")
          .min(5, "La descripción debe tener al menos 5 caracteres"),
      }),
    ),
  });

  const onSubmit = async (values, { resetForm }) => {
    if (!cita) {
      alert("Error: No se encontraron datos de la cita.");
      return;
    }
    console.log(cita);
    const datosAEnviar = {
      idAgendaFk: cita.idAgenda || "ID de agenda no disponible",
      idPetFk: cita.idPetFk || "ID de mascota no disponible",
      creadoPor: cita.idMedicoFk || "Usuario no disponible",
      idUsuarioFk: cita.idUsuarioFk || "Dueño no disponible",
      ...values,
    };

    console.log("Datos a enviar: ", datosAEnviar);
    try {
      await axiosInstance.post("/api/historialClinico", datosAEnviar);
      alert("Historial y notas guardados con éxito.");
      dispatch(fetchCitas(cita.usuario.id));
      resetForm();
    } catch (error) {
      console.error("Error al guardar el historial: ", error);
      alert("No se pudo guardar el historial.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form>
          <h3>
            Cliente: {cita?.usuario?.nameUser} {cita?.usuario?.lastNameUser}
          </h3>
          <p>
            Mascota: {cita?.mascota?.namePet} - {cita?.mascota?.especie}
          </p>

          <div className="form-group">
            <label>Descripción General de la Consulta</label>
            <Field
              as="textarea"
              name="descripcionHistorial"
              placeholder="Describe la consulta general"
            />
            <ErrorMessage name="descripcionHistorial" component="div" />
          </div>

          <div className="form-group">
            <label>Estado</label>
            <Field as="select" name="estadoHistorial">
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Field>
            <ErrorMessage name="estadoHistorial" component="div" />
          </div>

          <div>
            <h4>Notas</h4>
            <FieldArray name="notas">
              {({ remove, push }) => (
                <div>
                  {values.notas.map((nota, index) => (
                    <div key={index}>
                      <label>Título de la Nota</label>
                      <Field
                        name={`notas[${index}].tituloNota`}
                        placeholder="Título de la nota"
                      />
                      <ErrorMessage
                        name={`notas[${index}].tituloNota`}
                        component="div"
                      />

                      <label>Descripción de la Nota</label>
                      <Field
                        as="textarea"
                        name={`notas[${index}].descripcionNota`}
                        placeholder="Descripción de la nota"
                      />
                      <ErrorMessage
                        name={`notas[${index}].descripcionNota`}
                        component="div"
                      />

                      <button type="button" onClick={() => remove(index)}>
                        Eliminar Nota
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({ tituloNota: "", descripcionNota: "" })
                    }
                  >
                    Agregar Nota
                  </button>
                </div>
              )}
            </FieldArray>
          </div>

          <button type="submit">Guardar Historial</button>
        </Form>
      )}
    </Formik>
  );
};

export default HistorialPaciente;
