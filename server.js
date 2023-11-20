const http = require("http");
const app = require("./app");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mongoose1")
  .catch((error) => console.log(error));

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("server started at port ", port);
});
