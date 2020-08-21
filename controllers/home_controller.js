const Post = require('../models/post');

module.exports.home = function(req,res){
    // return res.end('<h1> Express is up for codial <!h1>');

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Codeial Home",
    //         posts: posts
    //     });
    // });

// in place of the above code, the follwing code is written so that we can display
// the name of the user with their post
// populate the user of each post
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: "Codeial Home",
            posts: posts
        });
    });


   
}

//to add new actions
//module.exports.actionName = function(req,res){}