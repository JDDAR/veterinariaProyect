import * as Yup from "yup";

export const updatePasswordScheme = Yup.object().shape({
  currentPassword: Yup.string().required("La contraseña actual es obligatoria"),
  newPassword: Yup.string()
    .required("La nueva contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden")
    .required("La confirmación de contraseña es obligatoria"),
});
