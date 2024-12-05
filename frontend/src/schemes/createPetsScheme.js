import * as Yup from "yup";

const createPetSchema = Yup.object({
  namePet: Yup.string()
    .max(30, "Máximo 30 caracteres")
    .required("El nombre de la mascota es obligatorio"),
  fechaNacimientoPet: Yup.date()
    .nullable()
    .required("La fecha de nacimiento es obligatoria"),
  estadoPet: Yup.string()
    .max(20, "Máximo 20 caracteres")
    .required("El estado de la mascota es obligatorio"),
  idEspeFk: Yup.string().nullable(), // Es opcional
});
export default createPetSchema;
