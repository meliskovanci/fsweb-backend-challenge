const router=require("express").Router();

const likeModel=require("../models/like-model");
const tweetModel=require("../models/tweet-model");
const {likeIsExist}=require("../middleware/like-middleware");


router.get('/:user_id', async (req, res, next) => {
    try {
      const { User_id } = req.params;
      const favs = await likeModel.getlikeByUser(User_id);
      res.status(200).json(favs);
    } catch (error) {
      next(error);
    }
  });

router.get("/", async(req,res,next)=>{
    try {
        const allLike=await likeModel.getAllLike()
        res.status(200).json(allLike)
    } catch (error) {
        next(error)
    }
})

router.post("/", likeIsExist, async(req,res,next)=>{
    const inserted=await tweetModel.getById(req.body.tweet_id);
    const comment=await inserted.comment;
    try{
        const newLike={
            tweet_id:req.body.tweet_id,
            user_id:req.body.user_id
        
        }
        await likeModel.createLike(newLike);
        
        res.status(201).json(comment) 
    } 
    catch (error) {
    next(error);
}
});





module.exports=router;