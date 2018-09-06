const app = require('./app');

app.get('/', function (req, res) {
    return res.send("Hello World");
});