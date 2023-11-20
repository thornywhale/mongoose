const http = require("http");
const express = require("express");
const yup = require("yup");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  content: String,
  isDone: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  deadline: Date,
  owner: {
    name: String,
    rating: Number,
  },
});
const Task = mongoose.model("Task", taskSchema);

mongoose
  .connect("mongodb://localhost:27017/mongoose1")
  .catch((error) => console.log(error));

const app = express();
app.use(express.json());
app.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.find();
    if (!tasks) {
      res.status(204).send("No content");
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
});
app.post("/tasks", async (req, res, next) => {
  try {
    const { body } = req;
    const newTask = await Task.create(body);
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("server started at port ", port);
});
