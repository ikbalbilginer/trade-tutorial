module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transactions", {
    type: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    symbol: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
    },
  });
  return Transaction;
};
