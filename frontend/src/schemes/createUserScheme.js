import * as Yup from "yup";

const createUserScheme = Yup.object().shape({
  tipoIdent: Yup.string()
    .required("El tipo de identificación es obligatorio.")
    .oneOf(["cc", "ti", "extrangeria", "otro"], "Selecciona un tipo válido."),
  numberDocument: Yup.string()
    .required("El número de identidad es obligatorio.")
    .matches(/^\d+$/, "El número de identidad solo debe contener dígitos.")
    .min(6, "El número de identidad debe tener al menos 6 caracteres.")
    .max(12, "El número de identidad no debe exceder los 12 caracteres."),
  nameUser: Yup.string()
    .required("El nombre del usuario es obligatorio.")
    .matches(
      /^[a-zA-Z\s]+$/,
      "El nombre solo debe contener letras y espacios.",
    ),
  lastNameUser: Yup.string()
    .required("El apellido del usuario es obligatorio.")
    .matches(
      /^[a-zA-Z\s]+$/,
      "El apellido solo debe contener letras y espacios.",
    ),
  addressUser: Yup.string().required(
    "La dirección del usuario es obligatoria.",
  ),
  telUser: Yup.string()
    .required("El teléfono de contacto es obligatorio.")
    .matches(/^\d+$/, "El teléfono solo debe contener números.")
    .min(10, "El teléfono debe tener al menos 10 dígitos.")
    .max(15, "El teléfono no debe exceder los 15 dígitos."),
  email: Yup.string()
    .required("El correo electrónico es obligatorio.")
    .email("Debes ingresar un correo electrónico válido."),
  idRolFk: Yup.string()
    .required("El rol del usuario es obligatorio.")
    .oneOf(["1"], "El rol seleccionado no es válido."),
});

export default createUserScheme;
