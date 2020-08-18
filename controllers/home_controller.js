
module.exports.home = function(req,res){
    // return res.end('<h1> Express is up for codial <!h1>');
    return res.render('home',{
        title: "Home"
    });
}

//to add new actions
//module.exports.actionName = function(req,res){}