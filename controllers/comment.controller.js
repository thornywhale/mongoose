const createError = require("http-errors");
const { Task, Comment } = require("../models");

// GET

module.exports.getAllTaskComments = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const comments = await Comment.find({ taskId });
    if (comments.length === 0) {
      return next(createError(204, "No content"));
    }
    if (!comments) {
      return next(createError(400, "Bad request"));
    }
    res.status(200).send({ data: comments });
  } catch (error) {
    next(error);
  }
};

module.exports.getCommentById = async (req, res, next) => {
  try {
    const {
      params: { commentId },
    } = req;
    const task = await Comment.findById(commentId);
    if (!task) {
      return next(createError(404, "Not found"));
    }
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

// POST

module.exports.createComment = async (req, res, next) => {
  try {
    const {
      body,
      params: { taskId },
      taskInstance,
    } = req;
    const newComment = await Comment.create({ ...body, taskId }); // taskId(from Model) : taskId(from params)
    if (!newComment) {
      return next(createError(400, "Bad request"));
    }
    const newComments = [...taskInstance.comments, newComment._id];
    await Task.findByIdAndUpdate(taskId, { comments: newComments });
    res.status(201).send({ data: newComment });
  } catch (error) {
    next(error);
  }
};

// PATCH

module.exports.updateCommentById = async (req, res, next) => {
  try {
    const {
      params: { commentId },
      body,
    } = req;
    const updatedComment = await Comment.findByIdAndUpdate(commentId, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedComment) {
      return next(createError(400, "Bad request"));
    }
    res.status(200).send({ data: updatedComment });
  } catch (error) {
    next(error);
  }
};

// DELETE

module.exports.deleteCommentById = async (req, res, next) => {
  try {
    const {
      params: { taskId, commentId },
      taskInstance,
    } = req;
    const updatedComments = taskInstance.comments.filter(
      (comm) => comm._id != commentId
    );
    await Task.findByIdAndUpdate(taskId, { comments: updatedComments });
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return next(createError(404, "Not exists"));
    }
    res.status(200).send({ data: deletedComment });
  } catch (error) {
    next(error);
  }
};
