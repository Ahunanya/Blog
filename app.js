//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "Struggling with your architectural projects? Discover in-depth case studies of real-world Nigerian designs, right here. Learn from local successes and build your understanding of context-driven architecture.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  res.render("home",{
    content: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res){
  res.render("about",{
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
  
});

// Add this route to handle individual post pages
app.get("/posts/:postTitle", function(req, res) {
  // Decode the parameter and convert it to lower case
  const requestedTitle = lodash.lowerCase(decodeURIComponent(req.params.postTitle));
  
  // Find the matching post from the posts array
  const foundPost = posts.find(post => lodash.lowerCase(post.title) === requestedTitle);

  if (foundPost) {
    console.log("Match found:", foundPost);
    res.render("post", {
      title: foundPost.title,
      content: foundPost.content
    });
  } else {
    console.log("No matching post found for:", requestedTitle);
    res.redirect("/");
  }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
