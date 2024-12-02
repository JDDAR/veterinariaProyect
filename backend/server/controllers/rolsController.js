const Rol = require("../models/rolModel");

exports.createRol = async (req, res) => {
  try {
    const { nameRol, areaRol, estadoRol } = req.body;

    if (!nameRol || !areaRol || !estadoRol) {
      return res.status(400).json({
        message:
          "Todos los campos(nameRol, areRol, estadoRol) son obligatorios ",
      });
    }

    const newRol = await Rol.create({
      nameRol,
      areaRol,
      estadoRol,
    });
    return res.status(201).json({
      message: "rol creado con exito ",
      rol: newRol,
    });
  } catch (error) {
    console.error("Error al crear el rol : ", error);
    return res.status(500).json({
      message: "Error al crear el rol ",
      error: error.message,
    });
  }
};
