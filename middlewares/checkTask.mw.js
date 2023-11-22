const createError = require("http-errors");
const { Task } = require("../models");

module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const task = await Task.findById(taskId);
    if (!task) {
      return next(createError(404, "Task not found"));
    }
    req.taskInstance = task;
    next();
  } catch (error) {
    next(error);
  }
};
