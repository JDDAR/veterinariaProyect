const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Rol = require("../models/rolModel");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error al obtener los usuarios: ", error);
    res.status(500).json({ error: "ERROR: al obtener los usuarios" });
  }
};

/* ********************* ENDPOINT PARA REGISTRAR USUARIO  ******/

exports.register = async (req, res) => {
  const {
    tipoDocumento,
    numberDocumento,
    nameUser,
    lastNameUser,
    addressUser,
    telUser,
    estadoUser,
    email,
    password,
    roleId,
    specialtyId,
  } = req.body;
  try {
    // Verificar que el rol exista
    const role = await Rol.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: "El rol especificado no existe" });
    }

    // Verificar que la especialidad exista (si es requerida)
    if (specialtyId) {
      const specialty = await Especialidades.findByPk(specialtyId);
      if (!specialty) {
        return res
          .status(404)
          .json({ message: "La especialidad especificada no existe" });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      tipoDocumento,
      numberDocumento,
      nameUser,
      lastNameUser,
      addressUser,
      telUser,
      estadoUser,
      email,
      password: hashedPassword,
      idRolFk: roleId,
      idEspeFk: specialtyId,
    });
    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", newUser });
  } catch (error) {
    console.log("Error en el registro: ", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

/* Validacion de usuario SIGNIN ****** TOKEN */

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Verificando si el usuario existe
    const user = await User.findOne({
      where: { email },
      include: { model: Rol, as: "role" },
    });
    if (!user) {
      return res.status(404).json({ message: "usuario no encontrado " });
    }

    //Comparando contraseñas
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Credenciales incorrectas ..." });
    }

    //Comparando contraseña y numberDocumento
    const isdefauldPassword = await bcrypt.compare(
      String(user.numberDocumento),
      String(user.password),
    );

    if (isdefauldPassword) {
      return res.status(200).json({
        message: "Debe Cambiar su contraseña ante de continuar",
        updatePasswordRequired: true,
      });
    }

    //Generando el Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role.nameRol },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );
    return res.status(200).json({
      message: "Inicio de sesoón exitoso ",
      token,
      role: user.role.nameRol,
      id: user.id,
    });
  } catch (error) {
    console.log("Error en login: ", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

//*************** CREANDO USUARIO CON PERMISOS **************************//

exports.createUsuario = async (req, res) => {
  const {
    tipoDocumento,
    numberDocumento,
    nameUser,
    lastNameUser,
    addressUser,
    telUser,
    email,
    estadoUser,
    idRolFk,
  } = req.body;

  const { role } = req.user;

  try {
    console.log("rol: dsds", role);
    if (role !== "veterinario" && role !== "administrador") {
      return res.status(403).json({
        message:
          "solo los veterinarios o administradores pueden crear usuarios",
      });
    }

    //Verifico que solo el veterinario cree el rol de cliente
    const rolSolicitado = await Rol.findByPk(idRolFk);
    if (role === "veterinario" && rolSolicitado !== "cliente") {
      return res.status(403).json({
        message:
          "Los veterinarios solo pueden crear usuarios con el rol de cliente ",
      });
    }

    //asignando contraseña predeterminada igual al nuemero de identidad
    const password = await bcrypt.hash(String(numberDocumento), 10);
    console.log(req.body);

    const newUsuario = await User.create({
      tipoDocumento,
      numberDocumento,
      nameUser,
      lastNameUser,
      addressUser,
      telUser,
      email,
      password,
      estadoUser,
      idRolFk,
    });

    res.status(201).json({
      message: "Usuario creado exitosamente ",
      usuario: newUsuario,
    });
  } catch (error) {
    console.error("error al Crear el cliente ", error);
    return res.status(500).json({
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
};

//*************** Finde createUsuario  CON PERMISOS **************************//
//
//
////*************** Actualizando contraseñas **************************//
exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const { id } = req.user;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado ",
      });
    }

    //Comparando contraseña actualiza
    const passwordValid = await bcrypt.compare(currentPassword, user.password);
    if (!passwordValid) {
      return res.status(401).json({
        message: "Contraseña actual es incorrecta",
      });
    }

    //Encriptando la nueva contraseña
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    //Actualizando la contraseña
    user.password = hashedNewPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Contraseña cambiada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la contraseña ...");
    res.status(500).json({
      message: "Error del servidor ......",
    });
  }
};
