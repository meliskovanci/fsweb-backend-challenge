/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('likes').truncate()
  await knex('comments').truncate()
  await knex('tweets').truncate()
  await knex('users').truncate()
 

  await knex('users').insert([
    {
      username:"alicikvelicik",
      name:"ali",
      surname:"veli",
      email:"acayipsali@gmail.com",
      password:"$2a$08$2IKlZUDUOYsuH8AJ.LLNFuOs9L8DMt2Cdw5y6JvcPfFtlZDDUAoBi",
     
    },
    {
      username:"delidolubirisi",
      name:"ayşe",
      surname:"şahin",
      email:"aysesahin@gmail.com",
      password:"$2a$08$2IKlZUDUOYsuH8AJ.LLNFuOs9L8DMt2Cdw5y6JvcPfFtlZDDUAoBi",
      
    },
    {
      username:"bayankahkaha",
      name:"fatma",
      surname:"baki",
      email:"fatmabaki@gmail.com",
      password:"$2a$08$2IKlZUDUOYsuH8AJ.LLNFuOs9L8DMt2Cdw5y6JvcPfFtlZDDUAoBi",
     
    }
  ]);

  await knex('tweets').insert([
    {
      text:"Bu yağmurlu havalarda tam uyku havası değil mi ya :D",
      user_id: 1
    },
    {
      text:"Buralar hep dutluktu...",
      user_id: 1
    },
    {
      text:"hak hukuk adalet...",
      user_id: 2
    },
    {
      text:"eee daha daha nasılsınız? :D :D",
      user_id: 3
    }
  ]);

  await knex('comments').insert([
    {
      content:"kişiye göre değişir",
      user_id: 1,
      tweet_id: 1
    },
    {
      content:"Sene kaç???",
      user_id: 1,
      tweet_id:2
    },
    {
      content:"Yok ki...",
      user_id: 2,
      tweet_id:3
    },
    {
      content:"Bizler iyiyiz siz nasılsınız?",
      user_id: 3,
      tweet_id:4
    }
  ]);

  await knex('likes').insert([
    {
      tweet_id:1,
      user_id:1
    },
    {
      tweet_id:2,
      user_id:1
    },
    {
      tweet_id:1,
      user_id:2
    },
    {
      tweet_id:1,
      user_id:3
    }
  ]);




};
