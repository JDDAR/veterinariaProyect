const Pet = require("../models/petModel");
const User = require("../models/userModel");

exports.createPet = async (req, res) => {
  try {
    const { namePet, fechaNacimientoPet, estadoPet, idUserFk, idEspeFk } =
      req.body;

    if (!idUserFk) {
      return res
        .status(400)
        .json({ error: "El ID del usuario es obligatorio" });
    }

    const nuevaMascota = await Pet.create({
      namePet,
      fechaNacimientoPet,
      estadoPet,
      idUserFk,
      idEspeFk: idEspeFk || null, // Puede ser null
    });

    res.status(201).json(nuevaMascota);
  } catch (error) {
    console.error("Error al registrar mascota:", error);
    res.status(500).json({ error: "Error al registrar la mascota" });
  }
};
