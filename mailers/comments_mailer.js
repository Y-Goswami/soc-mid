const nodeMailer = require('../config/nodemailer');

//instead of this below : 
// newComment = function(...    
// module.exports = newComment
// We use this (this is another method of exporting a method) :

exports.newComment = (comment) => {
    // console.log('inside new comment mailer');
    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'madhectorr@gmail.com',
        to: comment.user.email,
        subject: 'New comment published',
        html: htmlString
    },(err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}