const express = require("express");

const server = express();

const authRouter = require("./routers/auth-router");
const userRouter = require("./routers/user-router");
const tweetRouter = require("./routers/tweet-router");
const commentRouter = require("./routers/comment-router");
const likeRouter = require("./routers/like-router");
const mw = require("./token/token-middleware");

server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/user", mw.checkToken, userRouter);
server.use("/api/tweet", mw.checkToken, tweetRouter);
server.use("/api/comment", mw.checkToken, commentRouter);
server.use("/api/like", mw.checkToken, likeRouter)


server.get("/", (req, res) => {
  res.json({message: "Server is running!..."});
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;