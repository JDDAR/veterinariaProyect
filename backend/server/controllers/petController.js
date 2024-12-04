const { or } = require("sequelize");
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
//Enpoit parra aobtener las mascotas asociadas a un cliete :
exports.getPetsClient = async (req, res) => {
  try {
    const { clienteId } = req.query;
    console.log("Este es el id recibido desde el front : ", clienteId);
    // Validar que el clienteId esté presente
    if (!clienteId) {
      return res
        .status(400)
        .json({ error: "El parámetro clienteId es obligatorio." });
    }

    // Consultar las mascotas asociadas al cliente
    const mascotas = await Pet.findAll({
      where: { idUserFk: clienteId },
      attributes: ["idPet", "namePet", "fechaNacimientoPet", "estadoPet"],
    });

    // Responder con los datos encontrados
    res.status(200).json({ mascotas });
  } catch (error) {
    console.error("Error al obtener mascotas del cliente:", error);
    res
      .status(500)
      .json({ error: "Error al obtener las mascotas del cliente" });
  }
};

//FIN NNN Enpoit parra aobtener las mascotas asociadas a un cliete :
