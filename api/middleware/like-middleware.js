const likeModel=require("../models/like-model");

const likeIsExist=async (req,res,next)=>{

        try {
            const {tweet_id}=req.body;
            const isExist=await likeModel.checkByTweetId(tweet_id)
            if(isExist){
                res.status(422).json({message:"Bu gönderi daha önce beğenilmiş!"})
            }
            else{
                next()
            }
        } 
        catch (error) {
            next(error)
        }
    } 

module.exports={
    likeIsExist
}
