const { or } = require("sequelize");
const HistorialClinico = require("../models/historialModel");
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

/*filtrando mascotas teniendo encuenta el Documento del cliente ********/

exports.filterPetUser = async (req, res) => {
  const { documento } = req.query;

  console.log("Este es el id recibido desde el front : ", documento);
  console.log("Este es el documento a buscar: ", documento);

  try {
    console.log("Este es el numero de documento:", documento);
    // Buscar al usuario por el número de documento
    const user = await User.findOne({ where: { numberDocumento: documento } });
    console.log("El usuario es: ", user);
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
    // Verificar que la mascota existe
    const pet = await Pet.findByPk(mascotaId);
    if (!pet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    // Buscar los historiales clínicos asociados a la mascota
    const historiales = await HistorialClinico.findAll({
      where: { idPetFk: mascotaId },
      include: [
        { model: Pet, as: "mascota", attributes: ["namePet", "estadoPet"] },
        { model: User, as: "veterinario", attributes: ["nameUser", "email"] },
      ],
    });

    // Si no hay historiales, devolver un mensaje adecuado
    if (!historiales.length) {
      return res
        .status(404)
        .json({ message: "No se encontraron historiales para esta mascota." });
    }

    console.log(" historiales  ", historiales);
    // Responder con los historiales encontrados
    res.json({ historiales });
  } catch (error) {
    console.error("Error al obtener el historial de la mascota:", error);
    res
      .status(500)
      .json({ message: "Error al obtener el historial de la mascota" });
  }
};
