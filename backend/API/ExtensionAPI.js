class ExtensionAPI {

    constructor(app) {
        this.app = app;
        this.setUpApi();
    }

    setUpApi() {

        this.app.get('/ping', function (req, res) {
            res.send("Hello world!");
        }.bind(this));

    }
}

module.exports = ExtensionAPI;