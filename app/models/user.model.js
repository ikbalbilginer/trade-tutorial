module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    // balance: {
    //   type: Sequelize.DECIMAL(10, 2),
    // },
  });
  return User;
};
