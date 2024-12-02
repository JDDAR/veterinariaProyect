const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database"); // Importa la instancia de Sequelize

const Rol = sequelize.define("Rol", {
  idRol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nameRol: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  areaRol: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  estadoRol: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

module.exports = Rol;
