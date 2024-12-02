const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Race = sequelize.define("Race", {
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
});

module.exports = Race;
