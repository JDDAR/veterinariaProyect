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

//FIN NNN Enpoit parra aobtener las mascotas asociadas a un cliete

/*filtrando mascotas teniendo encuenta el id del cliente ********/

exports.filterPetUser = async (req, res) => {
  const { documento } = req.query;

  try {
    console.log("Este es el numero de documento:", documento);
    // Buscar al usuario por el número de documento
    const user = await User.findOne({ where: { numberDocumento: documento } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtener las mascotas asociadas al usuario
    const mascotas = await Pet.findAll({ where: { idUserFk: user.id } });
    res.json({ mascotas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las mascotas" });
  }
};

/*Obteniendo historial de una mascota teniendo en cuenta su id : */

exports.historialPet = async (req, res) => {
  const { mascotaId } = req.query;

  try {
    // Buscar el historial de la mascota con el id especificado
    const pet = await Pet.findByPk(mascotaId, {
      include: [{ model: HistorialClinico, as: "historial" }],
    });
    if (!pet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    res.json({ historial: pet.historial });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener el historial de la mascota" });
  }
};
