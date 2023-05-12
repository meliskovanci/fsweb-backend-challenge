const superTest = require("supertest");
const server = require("./api/server");
const db = require("./data/db-config");
const userModel = require("./api/models/user-model");
const tweetModel = require("./api/models/tweet-model");
const commentsModel = require("./api/models/comment-model");
const likeModel=require("./api/models/like-model");
const bcrypt = require("bcryptjs");


test("test environment testing olarak ayarlı", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });

  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });
  
  beforeEach(async () => {
    await db.seed.run();
  });
  
  afterAll(async () => {
    await db.destroy();
  });

  describe("______USERS_____", () => {
    test("[1] getAll user", async () => {
      const users = await userModel.getAll();
      expect(users).toBeDefined();
      expect(users).toHaveLength(3);
      expect(users[0]).toHaveProperty("name", "ali");
    });

    test("[2] create user", async () => {
        const newUser = await userModel.create({
          username:"alicikvelicik123",
          name: "ali",
          surname: "veli",
          email: "acayipsali1@gmail.com",
          password: "12345",
        });
        expect(newUser).toBeDefined();
        expect(newUser).toMatchObject({
          username:"alicikvelicik123",
          name:"ali",
          surname:"veli",
          
        });
    });

    test("[3] update user", async () => {
            const updatedUser = await userModel.updateUser(1, {
              username:"alicikvelicik123",
              name: "alicik",
              surname: "veli",
              email: "acayipsali1@gmail.com",
              password: "12345",
            });
            
            expect(updatedUser).toMatchObject({
              username:"alicikvelicik123",
              name: "alicik",
              surname: "veli",
              email: "acayipsali1@gmail.com",
              
            });
          });
        
      });


       describe("_____TWEETS____", () => {
         test("[1] getAll tweet", async () => {
           const tweets = await tweetModel.getAllTweet();
           expect(tweets).toBeDefined();
           expect(tweets).toHaveLength(4);
           expect(tweets[0]).toMatchObject({ user_id: 1, text: "Bu yağmurlu havalarda tam uyku havası değil mi ya :D" });
         });
      
         test("[2] create tweet", async () => {
           const newTweet = await tweetModel.createTweet({
             text: "Bu yağmurlu havalarda tam uyku havası değil mi ya :D",
             user_id: 1
           });
           expect(newTweet).toBeDefined();
           expect(newTweet).toMatchObject({ text: "Bu yağmurlu havalarda tam uyku havası değil mi ya :D", user_id: 1 });
         });
      
        test("[3] update tweet", async () => {
          const updatedTweet = await tweetModel.updateTweet(1, {
            user_id: 1,
            text: "Bu yağmurlu havalarda tam uyku havası değil mi ya",
          });
          expect(updatedTweet).toMatchObject({ user_id: 1, text: "Bu yağmurlu havalarda tam uyku havası değil mi ya" });
        });
       });

       describe("_________COMMENTS_______", () => {
        test("[1] getAll comment", async () => {
          const comments = await commentsModel.getAll();
          expect(comments).toBeDefined();
          expect(comments).toHaveLength(4);
          expect(comments[0]).toMatchObject({
            content: "kişiye göre değişir",
            user_id: 1,
            tweet_id: 1,
          });
        });
        test("[2] create comment", async () => {
          const newComment = await commentsModel.create({
            content: "kime göre neye göre",
            user_id: 1,
            tweet_id: 1,
          });
          expect(newComment).toBeDefined();
          expect(newComment).toMatchObject({
            content: "kime göre neye göre",
            user_id: 1,
            tweet_id: 1,
          });
        });
      
        test("[3] update comment", async () => {
          const updatedComment = await commentsModel.updateById(1, {
            content: "kime göre neye göre belli değil",
            user_id: 1,
            tweet_id: 1,
          });
          expect(updatedComment).toMatchObject({
            content: "kime göre neye göre belli değil",
            user_id: 1,
            tweet_id: 1,
          });
        });

      })


      describe("_________LİKE_______", () => {
        test("[1] getAll like", async () => {
          const likes = await likeModel.getAllLike();
          expect(likes).toBeDefined();
          expect(likes).toHaveLength(4);
          expect(likes[0]).toMatchObject({
            tweet_id:1,
            user_id:1
          });
        });


      })

      describe("Token kontrolü", () => {
        it("[1] token doğru mu ", async () => {
          const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2ODM3Mjc4MjEsImV4cCI6MTY4MzgxNDIyMX0.JSvRS5BEuCEJyy_sufUbs34ELvBKm5EGI4SzSXUdn5c";
          const res = await superTest(server)
            .get("/api/user")
            .set("Authorization", token);
            expect(res.status).toBe(401)
            expect(res.body).toMatchObject({ message: "bu token geçersizdir" });
        });
    

      })
      

      describe("Endpoint testleri", () => {
        describe("[GET] /", () => {
          test("[1] server çalışıyor", async () => {
            const res = await superTest(server).get("/");
            expect(res.body).toMatchObject({ message: "Server is running!..." });
            expect(res.status).toBe(200);
          });
        });

      })


      describe("Users____GET ", () => {
        it("[1] doğru sayıda users geliyor mu", async () => {
          const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2ODM4NzcwNTUsImV4cCI6MTY4Mzk2MzQ1NX0.1t1O4VKUr9-QhUMsnkzw1bRYD5H1KXJ7oDoju7tawgI";
          const res = await superTest(server)
            .get("/api/user")
            .set("Authorization", token);
          expect(res.status).toBe(200)
          expect(res.body).toHaveLength(3);
        });
        it("[2] doğru id yoksa hata mesajı geliyor mu", async ()=>{
          const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2ODM4NzcwNTUsImV4cCI6MTY4Mzk2MzQ1NX0.1t1O4VKUr9-QhUMsnkzw1bRYD5H1KXJ7oDoju7tawgI";
        const res = await superTest(server)
          .get("/api/user/4")
          .set("Authorization", token);
        expect(res.status).toBe(404)
        expect(res.body.message).toBe("kullanıcı bulunamadı.");
        })
      
       
      });


    

  