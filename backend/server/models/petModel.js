const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");

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
      allowNull: false,
    }, // Relación con la tabla User
    idEspeFk: {
      type: DataTypes.UUID,
      allowNull: true,
    }, // Relación con especialidad
  },
  {
    sequelize,
    modelName: "Pet",
    tableName: "Mascota", // Nombre de la tabla en la base de datos
    timestamps: true,
  },
);

module.exports = Pet;
