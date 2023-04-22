//jshint esversion:6

const express = require("express");
//const bodyParser = require("body-parser");
const ejs = require("ejs");
const _= require("lodash");
const mongoose=require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
//let inputDatas=[];

app.set('view engine', 'ejs');

//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({}));
app.use(express.static("public"));

// neeche sab mongoose se mongoDB ke connection ka system hai
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/blogDB");
    
}
// upar sab mongoose wala system hai 

const postSchema=new mongoose.Schema({
     title: String,
     content: String
});

const Post=new mongoose.model("Post",postSchema);


app.get("/", function(req,res){
   //res.send(__dirname+"/views/home");
   Post.find({})
   .then(function(foundPosts){
    res.render("home", {hsc:homeStartingContent, inputDatas:foundPosts})
   })
   .catch(function(err){
    console.log(err);
   })

   //res.render('home', {hsc:homeStartingContent,inputDatas:inputDatas});
})

app.get("/about", function(req,res){
  res.render('about', {ac:aboutContent});
})

app.get("/contact", function(req,res){
  res.render('contact', {cc: contactContent});
})

app.get("/compose", function(req,res){
  res.render('compose');
})

app.post("/compose", function(req,res){
  //console.log("//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
  const inputData=new Post({
        title:req.body.titles, content:req.body.posts
  });
  inputData.save()
  .then(function(){
    console.log("added successfully");
    res.redirect("/"); //added it here coz sometimes page was reloading even when the post wasnt saved
  })
  .catch(function(err){
    console.log(err);
  });
  //console.log(req.body.titles);
  //console.log(inputData);
  //inputDatas.push(inputData);
  
  //console.log(inputDatas);   returns that cutu array

  //res.send("thanks");
  //res.render('home',{hsc:homeStartingContent,});
  
 // res.redirect("/"); //removed it from here coz page was reloading even when the post wasnt saved
  //res.render('home', {inputDatas:inputDatas, hsc:homeStartingContent});
})

app.get("/posts/:postId",function(req,res){
  //console.log(req.params.topic);
  //let a=_.lowerCase(req.params.topic);  //bookmark
  let a =req.params.postId;
  var k=0;
  let i=0;
  Post.findOne({_id:a})
  .then(function(foundYou){
    res.render("post",{title:foundYou.title , post:foundYou.content});
  })
  .catch(function(err){
    console.log(err);
  });
  //for(i=0;i<inputDatas.length;i++)
  // {
  //   if(_.lowerCase(inputDatas[i].title)==a)    // sirf yhi 3 jga inputDatas likha hai
  //   {
  //     k=1;
  //     break;
  //   }
  // }
  // if(k==1)
  // { console.log("match found");
  //   res.render("post", {title:inputDatas[i].title, post:inputDatas[i].posts});  
  // }

  //res.redirect("/");
});



app.post("/delete", function(req,res){
  const idDelete= req.body.button;
  Post.deleteOne({_id:idDelete})
    .then(function(){
      console.log("successfully deleted");
    })
    .catch(function(err){
      console.log(err);
    });
  
    res.redirect("/");

  
  
  
  });
  
  

app.listen(3000, function(){
  console.log("running on port 3000");
})

