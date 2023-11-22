const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { contentSchema } = require("../utils/validationSchemas");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content is empty!"],
      validate: {
        validator: (value) => contentSchema.isValid(value),
        message: (props) => `"${props.value}" is too short comment`,
      },
    },
    like: { type: Number, default: 0 },
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Comment = model("Comment", commentSchema);

module.exports = Comment;
