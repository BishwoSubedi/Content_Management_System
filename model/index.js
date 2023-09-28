const dbCon = require("../config/dbCon.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbCon.DB, dbCon.USER, dbCon.PASSWORD, {
  host: dbCon.HOST,
  dialect: dbCon.dialect,
  operatorsAliases: false,
  pool: {
    max: dbCon.pool.max,
    min: dbCon.pool.min,
    acquire: dbCon.pool.acquire,
    idle: dbCon.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.blogs = require("./Model.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;