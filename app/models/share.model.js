module.exports = (sequelize, Sequelize) => {
  const Share = sequelize.define(
    "shares",
    {
      symbol: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
    },
    { timestamps: false }
  );
  return Share;
};
