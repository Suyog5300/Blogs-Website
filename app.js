//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "🌟 Welcome to our vibrant blog website! Immerse yourself in a world of captivating stories, expert insights, and diverse perspectives. From ✈️ travel and 🌿 lifestyle to 📱 tech and 💪 wellness, we offer a curated collection of articles that inform, entertain, and inspire. Join our community of curious minds, discover new ideas, and engage in meaningful discussions. Explore, learn, and enjoy the journey of reading and sharing on our blog. 📚🌐";
const aboutContent = "I am Suyog - I am an accomplished Web Dev and Software Dev armed with a degree in Computer Engineering💻. I'm passionate about transforming concepts into captivating websites. Let's team up and craft something remarkable together – feel free to reach me at suyogb5300@gmail.com.🌐🚀.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser:true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  Post.find({})
    .then(posts => {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
      });
    })
    .catch(err => {
      console.log(err);
    });
    
});


app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
  
});

app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});



app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId})
    .then(post => {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    })
    .catch(err => {
      console.log(err);
    });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
