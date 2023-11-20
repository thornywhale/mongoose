const express = require("express");
const TaskController = require("./controllers/task.controller");

const app = express();
app.use(express.json());

app
  .route("/tasks")
  // .get(TaskController.getAllTasks)
  .post(TaskController.createTask);

app.route("/done-tasks").get(TaskController.getDoneTasksV1);
app.route("/tasks").get(TaskController.getDoneTasksV2);

app.route("/done-tasks/bob").get(TaskController.getBobsDoneTasks);

app
  .route("/tasks/:taskId")
  .get(TaskController.getTaskById)
  .patch(TaskController.updateTaskById)
  .delete(TaskController.deleteTaskById);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status).send(err.message);
});

module.exports = app;
