const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Rol = require("./rolModel");
const Especialidades = require("./especialidadesModels");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  tipoDocumento: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  numberDocumento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nameUser: { type: DataTypes.STRING(20), allowNull: false },
  lastNameUser: { type: DataTypes.STRING(20), allowNull: false },
  addressUser: { type: DataTypes.STRING(20), allowNull: false },
  telUser: { type: DataTypes.STRING(20), allowNull: false },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: { type: DataTypes.STRING, allowNull: false },
  estadoUser: { type: DataTypes.STRING(20), allowNull: false },
});

User.belongsTo(Rol, { foreignKey: "idRolFk" });
User.belongsTo(Especialidades, { foreignKey: "idEspeFk", allowNull: true });

module.exports = User;
