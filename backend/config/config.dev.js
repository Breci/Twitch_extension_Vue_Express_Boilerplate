
const path = require('path');

module.exports = {
    api:{
        //Port to listen
        port : 8080,
        //if set to true use helmet to protect the API, not useful in dev
        secure : false,

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