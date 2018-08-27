const env = process.env.NODE_ENV ||"dev";
const config = require('./config.'+ env +'.js');

config.env = env;

module.exports = config;