const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./userModel");

class Pet extends Model {}

Pet.init(
  {
    idPet: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    namePet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaNacimientoPet: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estadoPet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idUserFk: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    idEspeFk: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Pet",
    tableName: "Mascota",
    timestamps: true,
  },
);
Pet.belongsTo(User, {
  foreignKey: "idUserFk",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

module.exports = Pet;

// Archivo server.js
sequelize
  .authenticate()
  .then(() => console.log("Conexión exitosa"))
  .catch((err) => console.error("Error al conectar:", err));

sequelize
  .sync({ alter: true })
  .then(() => console.log("Base de datos sincronizada"))
  .catch((err) => console.error("Error al sincronizar:", err));
