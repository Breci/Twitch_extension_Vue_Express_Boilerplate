FROM node:6.9.0

MAINTAINER Brice Culas, Breci

# Install the npm packages which change infrequently
WORKDIR /backend
COPY ./package.json ./
RUN npm install nodemon -g
RUN npm install --production

EXPOSE 8081
CMD ["./backend/entrypoint.sh"]
