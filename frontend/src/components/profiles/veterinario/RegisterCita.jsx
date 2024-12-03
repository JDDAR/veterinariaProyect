import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../api/axioInstance";

const initialValues = {
  fecha: "",
  horaInicio: "",
  horaFin: "",
  idMedicoFk: "",
  estadoAgenda: "",
  idPetFk: "",
};

const validationSchema = Yup.object().shape({
  fecha: Yup.date().required("La fecha es obligatoria"),
  horaInicio: Yup.string().required("La hora de inicio es obligatoria"),
  horaFin: Yup.string().required("La hora de fin es obligatoria"),
  idMedicoFk: Yup.number().required("Debe seleccionar un médico disponible"),
  estadoAgenda: Yup.string().required("El estado es obligatorio"),
  idPetFk: Yup.number().required("Debe seleccionar una mascota"),
});

const RegisterCita = ({ cliente, mascotas }) => {
  const [veterinarios, setVeterinarios] = useState([]);
  console.log("ID del cliente ", cliente);
  useEffect(() => {
    const fetchVeterinarios = async () => {
      try {
        const response = await axiosInstance.get("/api/veterinarios");
        setVeterinarios(response.data.veterinarios);
      } catch (error) {
        console.error("Error al cargar los veterinarios: ", error);
      }
    };

    fetchVeterinarios();
  }, []);

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axiosInstance.post("/api/agendamientos", values);
      alert("Cita creada exitosamente", response.data);
      resetForm();
    } catch (error) {
      console.error("Error al crear la cita: ", error);
      alert("Error al crear la cita");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <h4>Cliente: {cliente.name}</h4>
        <h5>Mascotas:</h5>
        <ul>
          {mascotas.map((mascota) => (
            <li key={mascota.id}>{mascota.name}</li>
          ))}
        </ul>
        <div className="form-group">
          <label htmlFor="fecha">Fecha</label>
          <Field type="date" name="fecha" id="fecha" />
          <ErrorMessage name="fecha" component="div" />
        </div>
        <div className="form-group">
          <label htmlFor="horaInicio">Hora de Inicio</label>
          <Field type="time" name="horaInicio" id="horaInicio" />
          <ErrorMessage name="horaInicio" component="div" />
        </div>
        <div className="form-group">
          <label htmlFor="horaFin">Hora de Fin</label>
          <Field type="time" name="horaFin" id="horaFin" />
          <ErrorMessage name="horaFin" component="div" />
        </div>
        <div className="form-group">
          <label htmlFor="idMedicoFk">Médico Disponible</label>
          <Field as="select" name="idMedicoFk" id="idMedicoFk">
            <option value="">Seleccione un médico</option>
            {veterinarios.map((vet) => (
              <option key={vet.id} value={vet.id}>
                {vet.nameUser}
              </option>
            ))}
          </Field>
          <ErrorMessage name="idMedicoFk" component="div" />
        </div>
        <div className="form-group">
          <label htmlFor="estadoAgenda">Estado de la Cita</label>
          <Field as="select" name="estadoAgenda" id="estadoAgenda">
            <option value="">Seleccione un estado</option>
            <option value="activo">Activo</option>
            <option value="cancelado">Cancelado</option>
          </Field>
          <ErrorMessage name="estadoAgenda" component="div" />
        </div>
        <button type="submit">Asignar Cita</button>
      </Form>
    </Formik>
  );
};

export default RegisterCita;
