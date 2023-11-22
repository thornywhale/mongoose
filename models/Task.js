const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { isAfter } = require("date-fns");

const { contentSchema, emailSchema } = require("../utils/validationSchemas");

const taskSchema = new Schema(
  {
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
        min: 0,
        max: 10,
        default: 0,
      },
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Task = model("Task", taskSchema);

module.exports = Task;
