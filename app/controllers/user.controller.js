const { db } = require("../models");

exports.getPortfolio = async (req, res) => {
  const { id } = req.params;

  const user = await db.users.findByPk(id, {
    attributes: ["id", "username"],
    include: {
      model: db.investments,

      as: "portfolio",
      include: { model: db.shares },
      attributes: { exclude: ["shareId"] },
    },
  });
  res.json(user);
};
