const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    // possible getter method for timmstamp

    createdAt: {
      type: Date,
      default: Date.now,
    },
    // the user that created the thought
    username: {
      type: String,
      required: true,
    },
    // array of nested docs created with reactionSchema
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual breaks it, not referenced anywhere
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
