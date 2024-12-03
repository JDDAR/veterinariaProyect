const User = require("../models/userModel");
const Rol = require("../models/rolModel"); // Asegúrate de importar el modelo correctamente

exports.getUserClientes = async (req, res) => {
  const { documento } = req.query;

  try {
    let clientes;
    if (documento) {
      // Filtrar por número de documento
      clientes = await User.findAll({
        where: {
          numberDocumento: documento,
          estadoUser: "Activo",
        },
      });
    } else {
      // Obtener todos los clientes con el rol "cliente"
      clientes = await User.findAll({
        where: {
          estadoUser: "Activo",
        },
        include: [
          {
            model: Rol,
            as: "role",
            where: { nameRol: "cliente" },
          },
        ],
      });
    }

    if (clientes.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron clientes activos" });
    }

    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
};
