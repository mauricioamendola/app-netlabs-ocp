FROM node:slim
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 8080
ENTRYPOINT ["node", "index.js"]
