FROM node:8.12.0

MAINTAINER Brice Culas, Breci

# Install the npm packages which change infrequently
WORKDIR /
COPY ./package.json ./
RUN npm i

EXPOSE 8080

CMD ["./frontend/entrypoint.sh"]
