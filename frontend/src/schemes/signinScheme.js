import * as Yup from "yup";

export const signinScheme = Yup.object().shape({
  email: Yup.string().required("Ingrese un correo registrado"),
  password: Yup.string().required("Ingrese una contraseña"),
});
