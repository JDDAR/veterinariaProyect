const Race = require("../models/raceModel");

exports.createRace = async (req, res) => {
  try {
    const { nameRace, species } = req.body;

    if (!nameRace || !species) {
      return res.status(400).json({
        message: "Todos los campos (nameRace, species) son obligatorios",
      });
    }

    const newRace = await Race.create({
      nameRace,
      species,
    });

    return res.status(201).json({
      message: "Se ha creado la especie con exito",
      race: newRace,
    });
  } catch (error) {
    console.error("Error al crear la raza ", error);
    return res.status(500).json({
      message: "Error al crear la raza ...",
      error: error.message,
    });
  }
};
