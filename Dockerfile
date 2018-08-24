FROM node:6.9.0

MAINTAINER Brice Culas, Breci

# Install the npm packages which change infrequently
WORKDIR /boilerplate
COPY ./package.json ./
RUN npm install nodemon -g
RUN npm install

EXPOSE 8080
CMD ["./entrypoint.sh"]
