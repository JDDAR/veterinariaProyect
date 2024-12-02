const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./userModel");
const Race = require("./raceModel");

const Mascota = sequelize.define("Mascota", {
  idPet: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  namePet: {
    type: DataTypes.STRING(20),
    allowNull: flase,
  },
  fechaNacimientoPet: {
    type: DataTypes.DATE,
  },
  estadoPet: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

Mascota.belongsTo(User, { foreignKey: "idUserFk" });
Mascota.belongsTo(Race, { foreignKey: "idEspeFk" });

module.exports = Mascota;
