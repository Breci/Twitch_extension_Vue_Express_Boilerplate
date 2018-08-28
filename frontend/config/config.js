const env = process.env.NODE_ENV ||"dev";
const config = require('./config.'+ env +'.js');

const DEFAULT_EBS_URL = "";

config.env = env;
if (!config.ebs.url){
    config.ebs.url = DEFAULT_EBS_URL
}

module.exports = config;