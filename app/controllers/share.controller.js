const { db } = require("../models");

exports.getAll = async (req, res) => {
    const allShares = await db.shares.findAll({});
    res.send(allShares);
}