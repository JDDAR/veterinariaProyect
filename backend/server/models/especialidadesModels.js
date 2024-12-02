const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Especialidades = sequelize.define("Especialidades", {
  idEspecialidad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombreEspecialidad: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  descripEspecialidad: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  estadoEspecialidad: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

module.exports = Especialidades;
