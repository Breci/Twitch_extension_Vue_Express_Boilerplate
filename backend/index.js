const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const awsServerlessExpress = require('aws-serverless-express');

const config = require(`./config/config`);
const ExtensionAPI = require('./API/ExtensionAPI');

const AUTH_REGEX = /^Bearer (.+)$/;

const SECRET = Buffer.from(config.extension.secret, 'base64');

const app = express();

//Define what to initialize for the Extension, API, ORM, etc
function configServer() {

    if (config.env === 'dev') {
        //Set up dev environment
        new ExtensionAPI(app);
    }
    else {
        //Set up production environment
        new ExtensionAPI(app);
    }
}

/** INITIALISATION OF THE WEB SERVER **/
app.use((req, res, next) => {
    console.log('Got request', req.path, req.method);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
});

if (config.api.secure) {
    app.use(helmet());
}
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

//Authorization check.
//Prevent use of the APi for people outside of Twitch.
app.use((req, res, next) => {
    if (req.headers.authorization) {
        let array = req.headers.authorization.match(AUTH_REGEX);
        if (array[1]) {
            jwt.verify(array[1], SECRET, function (err, decoded) {
                //TODO might need to change user to another name to prevent conflict with passport
                req.user = decoded;
                next();
            });
        }
        else {
            res.status(401).send();
        }
    }
    else {
        if(config.env ==="dev"){
            //Used for debug in dev mode
            next()
        }
        else{
            res.status(401).send();
        }
    }
});

//Initializing API endpoints and storage before exposing the web server
configServer();

//Set up local server
if (!config.api.useAWSLambda) {
    try {
        let options = {
            key: fs.readFileSync(config.api.ssl.keyPath),
            cert: fs.readFileSync(config.api.ssl.certPath),
        };
        https.createServer(options, app).listen(config.api.port, function () {
            console.log('Extension Boilerplate service running on https', config.api.port);
        });
    }
    catch (e) {
        console.error("Can\'t start https server. This might be caused by missing SSL files.");
        console.error("See documentation to see how to generate SSL certificates");
        process.exit(1);
    }
}
//With AWS lambda we do not need to listen since the aws library handle it
else {
    const server = awsServerlessExpress.createServer(app);
    exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
}
