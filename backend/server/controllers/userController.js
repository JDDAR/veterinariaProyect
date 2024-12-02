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

    //Generando el Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role.nameRol },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );

    return res
      .status(200)
      .json({
        message: "Inicio de sesoón exitoso ",
        token,
        role: user.role.nameRol,
      });
  } catch (error) {
    console.log("Error en login: ", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
