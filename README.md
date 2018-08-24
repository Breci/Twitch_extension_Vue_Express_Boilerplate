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
npm run page
```

## To start the Extensions Boilerplate service
```bash
docker-compose up --build
```

## To build your extension for testing or production
```bash
npm run build
```

## Further documentation

Please consult the [Twitch Extensions documentation on the Twitch developer site](https://dev.twitch.tv/docs/extensions)