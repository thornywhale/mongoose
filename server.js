require("dotenv").config();
const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_MONGO)
  .catch((error) => console.log(error));

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("server started at port ", port);
});
