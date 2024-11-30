const { Sequelize } = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize(
  process.env.DB_NAME || "db",
  process.env.DB_USER || "erasmo",
  process.env.DB_PASSWORD || "3727",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
  }
);

const tentar = 10;
const atraso = 2000;

async function connectWithRetries() {
  let vezesTentar = 0;

  while (vezesTentar < tentar) {
    try {
      await sequelize.authenticate();
      console.log("Conexão com o banco de dados estabelecida com sucesso.");

      await sequelize.sync();
      console.log("Modelos sincronizados com sucesso.");
      return;
    } catch (error) {
      vezesTentar++;
      console.error(
        `Erro ao conectar ao banco de dados (tentativa ${vezesTentar}):`,
        error
      );

      if (vezesTentar >= tentar) {
        console.error(
          "Máximo de tentar atingido. Não foi possível conectar ao banco de dados."
        );
        return;
      }

      console.log(`Tentando novamente em ${atraso / 1000} segundos...`);
      await new Promise((resolve) => setTimeout(resolve, atraso));
    }
  }
}

connectWithRetries();

module.exports = sequelize;
