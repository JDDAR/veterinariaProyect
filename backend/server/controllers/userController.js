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
