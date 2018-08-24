const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const environment = process.env.NODE_ENV || 'dev';
const config = require(`./config/config.${environment}.js`);

const AUTH_REGEX = /^Bearer (.+)$/;
const DEFAULT_LOCAL_STATIC_FOLDER_PATH = path.join(__dirname, '..', '/.dist/');

const app = express();

app.use((req, res, next) => {
    console.log('Got request', req.path, req.method);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
});

if (config.api.secure){
    app.use(helmet());
}
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

app.use((req, res, next) => {
    if (req.headers.authorization) {
        let array = req.headers.authorization.match(AUTH_REGEX);
        if (array[1]) {
            jwt.verify(array[1], Buffer.from(config.extension.secret, 'base64'), function (err, decoded) {
                //TODO might need to change user to another name to prevent conflict with passport
                req.user = decoded;
                next();
            });
        }
        else {
            next();
        }
    }
    else{
        next();
    }
});

//With AWS lambda we do not need to listen since the aws library handle it
if (true || !config.api.useAWSLambda) {

    try {

        if (config.api.static && config.api.static.host)
            app.use(express.static(config.api.static.path || DEFAULT_LOCAL_STATIC_FOLDER_PATH));
        let options = {
            key: fs.readFileSync(config.api.ssl.keyPath),
            cert: fs.readFileSync(config.api.ssl.certPath),
        };

        https.createServer(options, app).listen(config.api.port, function () {
            console.log('Extension Boilerplate service running on https', config.api.port);
        });
    }
    catch (e) {
        if (config.api.allowHttp) {
            console.log("Couldn't find SSL files, switching to http instead, Be aware that you can't test your Extension on Twitch without SSL encryption.");
            http.createServer(app).listen(config.api.port, function () {
                console.log('Extension Boilerplate service running on http', config.api.port);
            });
        }
        else {
            console.error("Can\'t start https server. This might be caused by missing SSL files.");
            console.error("Run \"certs/generate_local_ssl.sh\" to try to fix it.");
        }
    }

}
else if (config.api.useAWSLambda) {
    //TODO SET AWS
}


module.exports = app;