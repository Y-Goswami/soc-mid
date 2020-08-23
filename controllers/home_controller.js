const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req,res){ // we have used async await await feature 
    // return res.end('<h1> Express is up for codial <!h1>');

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Codeial Home",
    //         posts: posts
    //     });
    // });

// in place of the above code, the following code is written so that we can display
// the name of the user with their post
    try{
        // populate the user of each post
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        let users = await User.find({});
    
        return res.render('home',{
            title: "Codeial Home",
            posts: posts,
            all_users: users
        });
    }catch(err){
        console.log('Error',err);
        return;
    }
}

//to add new actions
//module.exports.actionName = function(req,res){}