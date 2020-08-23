const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req,res){
    // return res.end('<h1> Express is up for codial <!h1>');

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Codeial Home",
    //         posts: posts
    //     });
    // });

// in place of the above code, the following code is written so that we can display
// the name of the user with their post
// populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home',{
                title: "Codeial Home",
                posts: posts,
                all_users: users
            });
        });
    });
}

//to add new actions
//module.exports.actionName = function(req,res){}