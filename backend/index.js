const app = require('./app');

app.get('/', function (req, res) {
    return res.send("Hello, welcome to this page... Now go back to the extension !");
});