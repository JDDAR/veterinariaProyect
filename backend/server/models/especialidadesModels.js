const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");

class Especialidades extends Model {}

Especialidades.init(
  {
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
  },
  {
    sequelize,
    modelName: "Especialidades",
    tableName: "Especialidades",
    timestamps: false,
  },
);

module.exports = Especialidades;
