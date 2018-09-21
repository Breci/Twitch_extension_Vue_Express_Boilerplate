const API = require('./app');
const app = API.app;

app.get('/', function (req, res) {
    return res.send("Hello World");
});