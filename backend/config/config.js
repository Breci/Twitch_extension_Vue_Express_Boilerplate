const env = process.env.NODE_ENV ||"dev";
const config = require('./config.'+ env +'.js');

const DEFAULT_API_PORT = 8080;

config.env = env;
if (!config.api){
    config.api ={};
}
if (!config.api.useAWSLambda){
    if(!config.api.port){
        config.api.port = DEFAULT_API_PORT
    }
    if(!config.api.ssl){
        config.api.ssl = {
            certPath:path.join(__dirname, '../../', '/certs/testing.crt'),
            keyPath:path.join(__dirname, '../../', '/certs/testing.key')
        }
    }
    if(!config.api.ssl.certPath){
        config.api.ssl.certPath = path.join(__dirname, '../../', '/certs/testing.crt')
    }
    if(!config.api.ssl.keyPath){
        config.api.ssl.keyPath = path.join(__dirname, '../../', '/certs/testing.key')
    }
}

if (!config.extension){
    config.extension ={
        secret:process.env.EXTENSION_SECRET || "",
        clientId:process.env.EXTENSION_CLIENT_ID || ""
    };
}

if (!config.extension.secret){
    config.extension.secret = process.env.EXTENSION_SECRET || "";
}
if (!config.extension.clientId){
    config.extension.secret = process.env.EXTENSION_CLIENT_ID || "";
}
module.exports = config;