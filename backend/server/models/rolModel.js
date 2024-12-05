const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database"); // Importa la instancia de Sequelize

class Rol extends Model {}

Rol.init(
  {
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
  },
  {
    sequelize,
    modelName: "Rol",
    tableName: "Rols",
    timestamps: false,
  },
);

module.exports = Rol;
