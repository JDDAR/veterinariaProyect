const Agendamiento = require("../models/agendaModel");
const User = require("../models/userModel");
const Pet = require("../models/petModel");
const Rol = require("../models/rolModel");

// Obtener veterinarios
exports.obtenerVeterinarios = async (req, res) => {
  try {
    const veterinarios = await User.findAll({
      include: {
        model: Rol,
        as: "role",
        where: { nameRol: "Veterinario" },
      },
    });

    res.status(200).json({ veterinarios });
  } catch (error) {
    console.error("Error al obtener veterinarios: ", error);
    res.status(500).json({ error: "Error al obtener veterinarios" });
  }
};

// Crear agendamiento
exports.createAgendamiento = async (req, res) => {
  const { fecha, horaInicio, horaFin, idMedicoFk, idPetFk, estadoAgenda } =
    req.body;

  try {
    // Validar que el veterinario exista y sea válido
    const veterinario = await User.findOne({
      where: { id: idMedicoFk },
      include: {
        model: Rol,
        as: "role",
        where: { nameRol: "Veterinario" },
      },
    });

    if (!veterinario) {
      return res
        .status(404)
        .json({ error: "El médico/veterinario no es válido." });
    }

    // Validar que la mascota exista
    const mascota = await Pet.findOne({ where: { idPet: idPetFk } });

    if (!mascota) {
      return res.status(404).json({ error: "La mascota no es válida." });
    }

    // Crear el agendamiento
    const nuevoAgendamiento = await Agendamiento.create({
      fecha,
      horaInicio,
      horaFin,
      idMedicoFk,
      idPetFk,
      estadoAgenda,
    });

    res.status(201).json({
      message: "Cita creada exitosamente",
      agendamiento: nuevoAgendamiento,
    });
  } catch (error) {
    console.error("Error al crear agendamiento: ", error);
    res.status(500).json({ error: "Error al crear agendamiento" });
  }
};

// Obtener agendamientos
exports.getAgendamientos = async (req, res) => {
  try {
    const agendamientos = await Agendamiento.findAll({
      include: [
        { model: User, as: "usuario", attributes: ["nameUser", "email"] },
        { model: User, as: "medico", attributes: ["nameUser", "email"] },
        { model: Pet, as: "mascota", attributes: ["namePet"] },
      ],
    });

    res.status(200).json({ agendamientos });
  } catch (error) {
    console.error("Error al obtener agendamientos: ", error);
    res.status(500).json({ error: "Error al obtener agendamientos" });
  }
};
