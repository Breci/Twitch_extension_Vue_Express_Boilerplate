class ExtensionAPI {

    constructor(app) {
        this.app = app;
        this.setUpApi();
    }

    setUpApi() {

        this.app.get('/', function (req, res) {
            res.send("Hello world!");
        }.bind(this));

    }
}

module.exports = ExtensionAPI;