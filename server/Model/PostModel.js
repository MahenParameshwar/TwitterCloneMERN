const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      pinned: Boolean,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
