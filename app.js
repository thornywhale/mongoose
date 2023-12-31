const express = require("express");
const TaskController = require("./controllers/task.controller");
const CommentController = require("./controllers/comment.controller");
const { checkTask } = require("./middlewares/checkTask.mw");

const app = express();
app.use(express.json());

// TASKS

app
  .route("/tasks")
  .get(TaskController.getAllTasks)
  .post(TaskController.createTask);

app
  .route("/tasks/:taskId")
  .get(TaskController.getTaskById)
  .patch(TaskController.updateTaskById)
  .delete(TaskController.deleteTaskById);

// TASKS custom

app.route("/done-tasks").get(TaskController.getDoneTasksV1);
// app.route("/tasks").get(TaskController.getDoneTasksV2);
app.route("/done-tasks/bob").get(TaskController.getBobsDoneTasks);

// COMMENTS

app.route("/comments/:commentId").get(CommentController.getCommentById);
app
  .route("/tasks/:taskId/comments")
  .all(checkTask)
  .get(CommentController.getAllTaskComments)
  .post(CommentController.createComment);
app
  .route("/tasks/:taskId/comments/:commentId")
  .all(checkTask)
  .patch(CommentController.updateCommentById)
  .delete(CommentController.deleteCommentById);

// -----

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status).send(err.message);
});

module.exports = app;
