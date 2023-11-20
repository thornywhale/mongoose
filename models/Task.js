const yup = require("yup");
const { isAfter } = require("date-fns");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const { contentSchema, emailSchema } = require("../utils/validationSchemas");

const taskSchema = new Schema({
  content: {
    type: String,
    required: [true, "Content is empty!"],
    validate: {
      validator: (value) => contentSchema.isValid(value),
      message: (props) =>
        `"${props.value}" hasn't enought info, describe task better`,
    },
  },
  isDone: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  deadline: {
    type: Date,
    validate: {
      validator: (value) => isAfter(value, Date.now()),
      message: (props) => `"${props.value}" is not valid date`,
    },
  },
  owner: {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          emailSchema.isValid(value);
        },
        message: (props) => {
          `"${props.value}" is not valid email`;
        },
      },
    },
    rating: {
      type: Number,
      validate: {
        validator: (value) => value >= 0 && value <= 10,
      },
    },
  },
});
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
