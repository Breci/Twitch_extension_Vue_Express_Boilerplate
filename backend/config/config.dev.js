
const path = require('path');

module.exports = {
    api:{
        //Port to listen
        port : 8080,
        //if set to true use helmet to protect the API, not useful in dev
        secure : false,
        //Not recommended, will allow you to test without https.
        //But why ? You have everything for https and the twitch extension need https.

        allowHttp : false,
        //Should we give access to static assets ?
        static : {
            host : true,
            //if you want your own path for static assets.
            path : path.join(__dirname, '../..', '/.dist/'),
        },
        useAWSLambda : false,
        ssl:{
            certPath:path.join(__dirname, '../../', '/certs/testing.crt'),
            keyPath:path.join(__dirname, '../../', '/certs/testing.key')
        },
    },
    extension:{
        secret:"",
        clientId:""
    }

};