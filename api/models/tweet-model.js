const db = require("../../data/db-config");
const commentModel = require("../models/comment-model");

function getAllTweet() {
  return db("tweets as t")
    .leftJoin("users as u", "u.user_id", "t.user_id")
    .select("t.*","u.username", "u.name", "u.email", "u.surname");
}

async function createTweet(tweet) {
  const [newTweet] = await db("tweets").insert(tweet);
  const tweets = await getTweetsByUserId(newTweet);
  return tweets;
}

async function getTweetById(user_id) {
  const tweetYorum = await db("users as u")
    .leftJoin("tweets as t", "u.user_id", "t.user_id")
    .leftJoin("comments as c", "t.tweet_id", "c.tweet_id")
    .select(
      "u.user_id",
      "u.username",
      "u.name",
      "u.surname",
      "t.tweet_id",
      "t.text",
      "c.comment_id",
      "c.content"
    )
    .where("u.user_id", user_id)
    .groupBy("t.text");
  if (tweetYorum.length === 0) {
    return [];
  }

  const userModel = {
    user_id: user_id,
    name: tweetYorum[0].name,
    surname: tweetYorum[0].surname,
    Tweetler: [],
  };
  for (let i = 0; i < tweetYorum.length; i++) {
    const yorum = tweetYorum[i];
    const textModel = {
      tweet_id: yorum.tweet_id,
      text: yorum.text,
      Yorumlar: [],
    };
    const yorumlar = await commentModel.getByAllComment(yorum.tweet_id);
    textModel.Yorumlar = yorumlar;
    userModel.Tweetler.push(textModel);
  }
  return userModel;
}

function getTweetsByUserId(tweet_id) {
  return db("tweets").where({ tweet_id: tweet_id }).first();
}

async function updateTweet(id, tweet) {
  await db("tweets").where({ tweet_id: id }).update(tweet);
  return getTweetsByUserId(id);
}

async function deleteByTweetId(id) {
  const deletedTweet = await getTweetsByUserId(id);
  await db("tweets").where({ tweet_id: id }).del();
  return deletedTweet;
}

module.exports = {
  getAllTweet,
  getTweetsByUserId,
  createTweet,
  getTweetById,
  updateTweet,
  deleteByTweetId,
};
