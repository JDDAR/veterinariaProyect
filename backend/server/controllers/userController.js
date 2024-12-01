const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ message: "Usuario Registrado exitosamente", newUser });
  } catch (error) {
    console.log("Error en el registro : ", error);
    res.status(500).json({ message: "error del servidor..." });
  }
};

/* Validacion de usuario SIGNIN ****** TOKEN */

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Verificando si el usuario existe
    const user = await User.findOne({ where: { email } });
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
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );

    return res
      .status(200)
      .json({ message: "Inicio de sesoón exitoso ", token });
  } catch (error) {
    console.log("Error en login: ", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
