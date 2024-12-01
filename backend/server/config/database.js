const { Sequelize } = require("sequelize");

//Configurando la conexion a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false /* Desactiva los log de Sequelize */,
  },
);

module.exports = { sequelize };
