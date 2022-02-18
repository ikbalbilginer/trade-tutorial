const { db } = require("../models");

const validateParams = async (req,res,next) => {
    const {symbol, userId} = req.body;

    const dbShare = await db.shares.findOne({
      where: { symbol },
      attributes: ["symbol", "price", "id"],
    });
  
    if (!symbol || !dbShare) {
      return res
        .status(500)
        .send({ error: `No share with symbol  :  ${symbol}` });
    }
  
    const dbUser = await db.users.findByPk(userId, {
      include: {
        model: db.investments,
        as: "portfolio",
        include: { model: db.shares },
      },
    });
  
    if (!dbUser) {
      return res.status(500).send({ error: `User not found.` });
    }
  
    if (!dbUser.portfolio?.length) {
      return res.status(500).send({ error: `User has no portfolio.` });
    }

    req.dbShare = dbShare;
    req.dbUser = dbUser;
    next();
}

module.exports = {validateParams};
