const Pet = require("../models/petModel");
const User = require("../models/userModel");

exports.createPet = async (req, res) => {
  const { idUserFk, pets } = req.body;

  try {
    const cliente = await User.findByPk(idUserFk);
    if (!cliente) {
      return res.status(400).json({
        message:
          "Solo se pueden agregar mascotas a usuarios con rol de cliente",
      });
    }
    const petsFk = pets.map((pet) => ({
      ...pet,
      idUserFk: cliente.id,
    }));
    const newPets = await Pet.bulkCreate(petsFk);

    res.status(201).json({
      message: "Mascotra Creada exitosamente",
      mascota: newPets,
    });
  } catch (error) {
    console.error("Error al agregar mascotas ", error);
    return res.status(500).json({
      message: "Error al crear y agregar nueva mascota ",
      error: error.message,
    });
  }
};
