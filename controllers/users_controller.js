
const User = require('../models/user'); 
const { response } = require('express');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: "User Profile Page",
            profile_user: user
        });
    });
}


module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
    }
    else{
        res.status(401).send('Unauthorized');
    }
}

//render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
    });
}

//render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title : "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err, user){
        if(err){console.log('error in finding user in signing up'); return}
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in finding user while signing up'); return}
                // console.log('user created');
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}

//sign in and a create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}


//sign out
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}
