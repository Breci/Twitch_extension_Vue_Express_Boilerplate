module.exports = {
    server:{
        useAWSLambda: true, //if set to true, will disable the app listening and let aws lambda do it.
        secure: true
    },
    extension: {
        secret: process.env.EXTENSION_SECRET ,
        clientId: process.env.CLIENT_ID
    },

}