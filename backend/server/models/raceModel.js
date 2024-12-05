const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database"); // Importa la instancia de Sequelize

class Race extends Model {}

Race.init(
  {
    idRace: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nameRace: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Race",
    tableName: "Races",
    timestamps: false,
  },
);

module.exports = Race;
