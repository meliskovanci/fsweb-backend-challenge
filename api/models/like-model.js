const db=require("../../data/db-config");

async function getAllLike(){

    return await db("likes as l")
    .leftJoin("tweets as t", "t.tweet_id","l.tweet_id")
    .select("l.*","t.text")
}

async function getById(user_id){

    return await db("likes").select().where("user_id",user_id)
}


async function getlikeByUser(userId) {
    return await db("likes")
        .join("tweets", "likes.tweet_id", "tweets.tweet_id")
        .select("likes.like_id", "tweets.comment")
        .where("likes.user_id", userId);
}

async function getByFilter(filter){

    return await db("likes as l")
    .leftJoin("tweets as t", "l.tweet_id","t.tweet_id")
    .select("l.like_id","t.comment")
    .where("like_id",filter)
    .first()
}
async function checkByTweetId(filter){

    return await db("likes as l")
    .leftJoin("tweets as t", "l.tweet_id","t.tweet_id")
    .select("l.like_id","t.comment")
    .where("t.tweet_id",filter)
    .first()
}


async function createLike(like){
    const [like_id]=await db("likes").insert({ 
        tweet_id: like.tweet_id, 
        user_id: like.user_id 
    })

    return getByFilter(like_id);
    
}
const deleteById=async (like_id)=>{
    return await db("likes").where("like_id",like_id).del()
}

module.exports={
    getAllLike,
    getById,
    createLike,
    checkByTweetId,
    getByFilter,
    getlikeByUser,
    deleteById
}