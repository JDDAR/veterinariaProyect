const Agenda = require("../models/agendaModel");
const HistorialClinico = require("../models/historialModel");
const Pet = require("../models/petModel");
const User = require("../models/userModel");

exports.saveHistorialClinico = async (req, res) => {
  try {
    const {
      descripcionHistorial,
      estadoHistorial,
      notas,
      idAgendaFk,
      idPetFk,
      creadoPor,
      idUsuarioFk,
    } = req.body;

    // Validación de los datos de entrada (puedes agregar más validaciones si lo deseas)
    if (
      !descripcionHistorial ||
      !estadoHistorial ||
      !idAgendaFk ||
      !idPetFk ||
      !creadoPor
    ) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // Verificar existencia de agenda, mascota y veterinario
    const agenda = await Agenda.findByPk(idAgendaFk);
    const pet = await Pet.findByPk(idPetFk);
    const user = await User.findByPk(creadoPor);

    console.log("idUseuaropBack: ", user);

    if (!agenda || !pet || !user) {
      return res.status(404).json({
        message: "Datos de agenda, mascota o veterinario no encontrados",
      });
    }

    // Crear el historial clínico en la base de datos
    const nuevoHistorial = await HistorialClinico.create({
      descripcionHistorial,
      estadoHistorial,
      notas, // Array de notas
      idAgendaFk,
      idPetFk,
      creadoPor,
      idUsuarioFk,
    });

    // Responder con el historial creado
    return res.status(201).json({ historial: nuevoHistorial });
  } catch (error) {
    console.error("Error al crear historial clínico:", error);
    return res.status(500).json({
      message: "Error al crear historial clínico",
      error: error.message,
    });
  }
};
