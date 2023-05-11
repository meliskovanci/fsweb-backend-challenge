const db = require("../../data/db-config");

const getAll = () => {
  return db("comments as c")
    .leftJoin("users as u", "u.user_id", "c.user_id")
    .leftJoin("tweets as t", "t.tweet_id", "c.tweet_id")
    .select("c.*", "u.name", "u.surname", "u.email", "t.text");
};

const getByAllComment = async function (tweet_id) {
  const yorumlar = await db("comments as c")
    .leftJoin("tweets as t", "c.tweet_id", "t.tweet_id")
    .select("c.comment_id", "c.content", "t.tweet_id", "c.user_id")
    .where("t.tweet_id", tweet_id);
  return yorumlar;
};

const getCommentById = async (id) => {
  const insertedId = await db("comments").where({ comment_id: id }).first();
  return insertedId;
};

const getCommentsByUserId = async (userid) => {
  const insertedId = await db("comments as c")
    .leftJoin("users as u", "u.user_id", "c.user_id")
    .leftJoin("tweets as t", "t.tweet_id", "c.tweet_id")
    .select("c.*","u.username", "u.name", "u.surname", "u.email", "t.text")
    .where("comment_id", userid);
  return insertedId;
};

const create = async (comment) => {
  const newComments = await db("comments").insert(comment);
  console.log(newComments);
  const comments = await getCommentsByUserId(newComments);
  return comments;
};



async function updateById(id, comment) {
  await db("comments").where({ comment_id: id }).update(comment);
  return getCommentById(id);
}
async function deleteById(id) {
  const deletedComment = await getCommentById(id);
  await db("comments").where({ comment_id: id }).del();
  return deletedComment;
}

module.exports = {
  getAll,
  getCommentsByUserId,
  create,
  getByAllComment,
  getCommentById,
  updateById,
  deleteById,
};
