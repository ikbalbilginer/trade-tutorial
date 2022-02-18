const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const {
  // investments_testData,
  users_testData,
  shares_testData,
} = require("../constants/testdata");

const db = {};

const bootstrap_testData = async () => {
  await db.shares.bulkCreate(shares_testData, { ignoreDuplicates: true });

  await db.users.bulkCreate(users_testData, {
    ignoreDuplicates: true,
    include: [
      { model: db.investments, as: "portfolio", ignoreDuplicates: true },
    ],
  });
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.shares = require("./share.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.investments = require("./investment.model.js")(sequelize, Sequelize);
db.transactions = require("./transaction.model.js")(sequelize, Sequelize);

// associations
db.users.hasMany(db.investments, { as: "portfolio" });
db.users.hasMany(db.transactions, { as: "transactions" });

db.investments.belongsTo(db.users);
db.investments.belongsTo(db.shares);
db.transactions.belongsTo(db.users, {foreignKey: 'userId'});
//

module.exports = { db, bootstrap_testData };
