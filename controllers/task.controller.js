const createError = require("http-errors");
const { Task, Comment } = require("../models");

// GET

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate({
      path: "comments",
      select: ["content", "createdAt"],
    });
    if (tasks.length === 0) {
      return next(createError(204, "No content"));
    }
    if (!tasks) {
      return next(createError(400, "Bad request"));
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getTaskById = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const task = await Task.findById(taskId).populate({
      path: "comments",
      select: ["content", "like"],
    });
    if (!task) {
      return next(createError(404, "Not found"));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.getDoneTasksV1 = async (req, res, next) => {
  try {
    const tasks = await Task.find({ isDone: true });
    if (tasks.length === 0) {
      return next(createError(204, "No content"));
    }
    if (!tasks) {
      return next(createError(400, "Bad request"));
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getDoneTasksV2 = async (req, res, next) => {
  try {
    const {
      query: { isDone },
    } = req;
    const tasks = await Task.find({ isDone });
    if (tasks.length === 0) {
      return next(createError(204, "No content"));
    }
    if (!tasks) {
      return next(createError(400, "Bad request"));
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getBobsDoneTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ isDone: true, "owner.name": "Bob" });
    if (tasks.length === 0) {
      return next(createError(204, "No content"));
    }
    if (!tasks) {
      return next(createError(400, "Bad request"));
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

// POST

module.exports.createTask = async (req, res, next) => {
  try {
    const { body } = req;
    const newTask = await Task.create(body);
    if (!newTask) {
      return next(createError(400, "Bad request"));
    }
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

// PATCH

module.exports.updateTaskById = async (req, res, next) => {
  try {
    const {
      params: { taskId },
      body,
    } = req;
    const updatedTask = await Task.findByIdAndUpdate(taskId, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return next(createError(400, "Bad request"));
    }
    res.status(200).send({ data: updatedTask });
  } catch (error) {
    next(error);
  }
};

// DELETE

module.exports.deleteTaskById = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return next(createError(404, "Not found"));
    }
    await Comment.deleteMany({ taskId: task._id });
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};
