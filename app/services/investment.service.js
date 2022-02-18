const { db } = require("../models");

exports.createOrUpdate = ({ share, userId, quantity, type }) => {
  return new Promise(async (resolve, reject) => {
    const query =
      type === "BUY" ? `quantity + ${quantity}` : `quantity - ${quantity}`;

    await db.investments
      .findOne({
        where: { userId },
        include: {
          model: db.shares,
          as: "share",
          where: { symbol: share.symbol },
        },
      })
      .then(function (obj) {
        // update
        if (obj) {
          obj.update({
            quantity: db.sequelize.literal(query),
          });

          resolve();
        } else {
          db.investments.create({
            userId: userId,
            shareId: share.id,
            quantity,
          });
          resolve();
        }
      });
  });
};
