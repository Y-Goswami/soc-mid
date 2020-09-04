

const express = require('express');

const env = require('./config/environment');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const app =express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');


const MongoStore = require('connect-mongo')(session);

//use SASS
const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');
// const { Server } = require('http');


//next two lines for the chat feature, set up the chat server to be used woth socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');
const { getLogger } = require('nodemailer/lib/shared');

if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path, 'scss'),
        dest: path.join(__dirname,env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix:'/css'
    }));
}

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));

//make the uploads path avaliable to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));


app.use(logger(env.morgan.mode,env.morgan.optons));

//use layout( before using routes)
app.use(expressLayouts);
//extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up view engine "ejs"
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codial',
    //TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave : false,
    cookie:{
        maxAge : (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
        },
        function(err){
            console.log(err ||'connect-mongodb setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        // console.log('Error : ',err); 
        console.log(`Error in running the server: ${err}`); //can use this instead of above line
    }
    
    console.log(`Server is running on port : ${port}`);
});
