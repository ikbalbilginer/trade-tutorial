const { db } = require("../models");
const services = require("../services");
const Op = db.Sequelize.Op;

exports.buy = async (req, res) => {
  const type = "BUY";
  const { userId, symbol, quantity } = req.body;
  const { dbShare, dbUser } = req;
  const price = dbShare.price;

  const newTransaction = await db.transactions.create({
    type,
    quantity,
    symbol,
    price,
    userId,
  });

  const dbInvestment = await services.investment.createOrUpdate({
    userId,
    quantity,
    share: dbShare,
    type,
  });

  res.status(200).send({
    success: true,
    message: "Transaction completed.",
    type,
    share: dbShare,
    quantity,
  });
};

exports.sell = async (req, res) => {
  try {
    const type = "SELL";
    const { userId, symbol, quantity } = req.body;
    const { dbShare, dbUser } = req;
    const price = dbShare.price;

    const shareOnPortfolio = dbUser.portfolio.find((inv) => {
      return inv.share.symbol === symbol;
    });

    if (!shareOnPortfolio) {
      return res.status(500).send({
        message: `Share is not in the portfolio : ${symbol}`,
      });
    }

    if (shareOnPortfolio.quantity < quantity) {
      return res.status(500).send({
        message: `Not enough share in portfolio.`,
      });
    }

    if (shareOnPortfolio.quantity == quantity) {
      await db.investments.destroy({
        where: { id: shareOnPortfolio.id },
      });
    } else {
      await services.investment.createOrUpdate({
        userId,
        quantity,
        share: dbShare,
        type,
      });
    }

    await db.transactions.create({
      type,
      quantity,
      symbol,
      price,
      userId,
    });

    res.status(200).send({
      message: "Transaction completed.",
      type,
      share: dbShare,
      quantity,
    });
  } catch (e) {
    console.log("... . . . . .  e . . . .  ", e);
    res.status(500).send({
      message: e,
    });
  }
};
