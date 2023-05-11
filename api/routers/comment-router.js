const router=require("express").Router();
const mw = require("../middleware/comment-middleware");
const commentsModel = require("../models/comment-model");


router.get("/", async (req, res, next) => {
  try {
    const allComments = await commentsModel.getAll();
    res.status(200).json(allComments);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkCommentId, async (req, res, next) => {
  const getId = await commentsModel.getCommentById(req.params.id);
  res.status(200).json(getId);
});

router.post("/", async (req, res, next) => {
  try {
    const newComments = await commentsModel.create(req.body);
    res.status(201).json(newComments);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", mw.checkCommentId, async (req, res, next) => {
  try {
    const updatedComment = await commentsModel.updateById(
      req.params.id,
      req.body
    );
    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", mw.checkCommentId, async (req, res, next) => {
  try {
    const deletedComment = await commentsModel.deleteById(req.params.id);
    res.json({ message: "kullanıcı silindi" });
  } catch (error) {
    next(error);
  }
});



module.exports=router;