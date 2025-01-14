const tweetModel = require("../models/tweet-model");

const checkUserId = async function (req, res, next) {
  try {
    const isExist = await tweetModel.getTweetByUserId(req.params.id);
    if (isExist.length == 0) {
      res.status(404).json({ messsage: "id bulunamadı" });
    } else {
      req.yorum = isExist;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkUserId };