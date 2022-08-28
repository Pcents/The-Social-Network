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
      get: (date) => timeSince(date),
    },
    // the user that created the thought
    username: {
      type: String,
      required: true,
    },
    // array of nested docs created with reactionSchema
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
    // or is it
    // [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

reactionCount
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.tags.length;
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
