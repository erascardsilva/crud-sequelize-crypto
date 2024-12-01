require("dotenv").config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY || "ECS",
  EXPIRES_IN: "1H",
};
