const Agenda = require("../models/agendaModel");
const User = require("../models/userModel");
const Pet = require("../models/petModel");
const Rol = require("../models/rolModel");

// Obtener veterinarios
exports.obtenerVeterinarios = async (req, res) => {
  try {
    // Buscar usuarios con el rol de veterinario
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
  const {
    fecha,
    horaInicio,
    horaFin,
    idMedicoFk,
    idPetFk,
    estadoAgenda,
    idUsuarioFk,
  } = req.body;

  console.log("Datos recibidos:", req.body);

  try {
    // Validar que el veterinario exista y sea válido
    console.log("Buscando veterinario...");
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
    console.log("Buscando mascota...");

    const mascota = await Pet.findOne({ where: { idPet: idPetFk } });

    if (!mascota) {
      return res.status(404).json({ error: "La mascota no es válida." });
    }

    // Crear el agendamiento
    const nuevoAgendamiento = await Agenda.create({
      fecha,
      horaInicio,
      horaFin,
      idMedicoFk,
      idPetFk,
      estadoAgenda,
      idUsuarioFk,
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

// Obtener agendamientos ***/// PARA ADMINISTRADOR
exports.getAgendamientos = async (req, res) => {
  try {
    const agendamientos = await Agenda.findAll({
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

// Obtener citas asociadas a un veterinario específico
exports.obtenerCitasPorVeterinario = async (req, res) => {
  const { id } = req.params;
  console.log("IDDDDDD... ", id);

  try {
    const citas = await Agenda.findAll({
      where: { idMedicoFk: id },
      include: [
        {
          model: User,
          as: "usuario",
          attributes: ["nameUser", "lastNameUser", "email"],
        },
        {
          model: Pet,
          as: "mascota",
          attributes: ["namePet"],
        },
      ],
      order: [
        ["fecha", "ASC"],
        ["horaInicio", "ASC"],
      ],
    });
    console.log("Citas encontradas: ", citas);
    if (!citas.length) {
      return res
        .status(404)
        .json({ message: "No se encontraron citas para este veterinario." });
    }

    res.status(200).json({ message: "Citas encontradas", citas });
  } catch (error) {
    console.error("Error al obtener citas: ", error);
    res.status(500).json({ error: "Error al obtener citas." });
  }
};
