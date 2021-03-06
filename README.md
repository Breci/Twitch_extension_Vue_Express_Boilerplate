# Twitch Extension : Vue/Express Boilerplate

This boilerplate allow you to easily create twitch extensions by handling both backend and frontend and building the files you need for deployment.

## Dependencies

You will need:
 * [docker](https://docs.docker.com/engine/installation/)
 * [docker-compose](https://docs.docker.com/compose/install/)

## Generate self-signed certs
```bash
cd certs
./generate_local_ssl.sh
    # Requires a sudo password so that the cert can be installed on the root keychain
    # If this install fails, see the README in ./certs for manual override.
```

## To add a new page to your frontend.
```bash
npm run generator
```

## To start the Extensions Boilerplate service
```bash
docker-compose up --build
```

## To build your extension for or production
By default the target is production.
```bash
npm run build
npm run build production
```

## To build your extension for testing
[env] is the targeted environment 
```bash
npm run build [env]
```

# Generated Files
You can find generated files on the dist/ folder.

## Backend
You can send these files to your own server. If you are using AWS lambda option, just zip it and upload it to your AWS function.

## Frontend
Compress these files as a .zip file and upload it to your Twitch extension.

## Credit
Based on [Twitch Extension Boilerplate](https://github.com/twitchdev/extensions-samples/tree/master/boilerplate)
## Further documentation

Please consult the [Twitch Extensions documentation on the Twitch developer site](https://dev.twitch.tv/docs/extensions)