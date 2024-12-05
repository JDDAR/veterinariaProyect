const Especialidades = require("../models/especialidadesModels");

exports.createEspecialidad = async (req, res) => {
  try {
    const { nombreEspecialidad, descripEspecialidad, estadoEspecialidad } =
      req.body;

    if (!nombreEspecialidad || !descripEspecialidad || !estadoEspecialidad) {
      return res.status(400).json({
        message: "Todos los campos son necesarios para crear la especialidad",
      });
    }

    const newEspecialida = await Especialidades.create({
      nombreEspecialidad,
      descripEspecialidad,
      estadoEspecialidad,
    });

    return res.status(200).json({
      message: "especialidad creada con exito",
      especialidad: newEspecialida,
    });
  } catch (error) {
    console.error("ERROR al crear la especialidad : ", error);
    return res.status(500).json({
      message: "Error al crear la especialidad",
      error: error.message,
    });
  }
};
