const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const { DOMAIN, MONGO_PORT, MONGO_DB } = require("./constants");

mongoose
  .connect(`mongodb://${DOMAIN}:${MONGO_PORT}/${MONGO_DB}`)
  .catch((error) => console.log(error));

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("server started at port ", port);
});
