require("dotenv").config();
const { Sequelize } = require ("sequelize");
const mysql2 = require("mysql2");
const sequelize = new Sequelize(
   process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        dialect: "mysql",
        dialectModule: mysql2,
        logging: false,
        pool: {max: 5, min: 0, acquire: 30000, idle: 10000}
    }
);

(async () => {
    try {
        await sequelize.authenticate();
    console.log("banco de dados conectado com sucesso!");
    }catch (error) {
        console.error("erro ao conectar com o banco de dados! " + error);
    }
})
module.exports = {Sequelize, sequelize}
