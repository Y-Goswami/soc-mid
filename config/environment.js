const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname,'../production_logs'); 
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key:'blahsomething',
    db: 'codeial_developement',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'madhectorr',
            pass:'madhector1234'
        }
    },
    google_client_id: "82640759918-05eiduuh7hf2sv41cb44r54ufdp7df4p.apps.googleusercontent.com",
    google_client_secret: "yD0y9kDclnOci9z97TjPzPV1",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan:{
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


//for security store all these values as system variables and use those instead of actual values in the code below
const production = {
    name: 'production',
    asset_path: './assets',
    session_cookie_key:'EppJZ2Oxd344aNsEOT1KNWXM3KGNvOLM',
    db: 'codeial_production',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'madhectorr',
            pass:'madhector1234'
        }
    },
    google_client_id: "82640759918-05eiduuh7hf2sv41cb44r54ufdp7df4p.apps.googleusercontent.com",
    google_client_secret: "yD0y9kDclnOci9z97TjPzPV1",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'DPlWADOwdkpfywfyryk1RRZqslKGW0fL',
    morgan:{
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}


module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);