FROM node:15.12.0-slim

COPY . /usr/src/app

WORKDIR /usr/src/app
RUN npm install
EXPOSE 8080
ENTRYPOINT ["node", "index.js"]
