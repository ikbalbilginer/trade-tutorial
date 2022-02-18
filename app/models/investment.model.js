module.exports = (sequelize, Sequelize) => {
  const Investment = sequelize.define("investments", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
  });
  return Investment;
};
