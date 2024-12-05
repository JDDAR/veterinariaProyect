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
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Pet",
    tableName: "Mascota",
    timestamps: true,
  },
);

module.exports = Pet;
