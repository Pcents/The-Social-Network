const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      Unique: true,
      Trimmed: true,
    },
    email: {
      type: String,
      required: true,
      Unique: true,
      validate: {
        validator: () => Promise.resolve(false),
        message: "Email validation failed",
      },
    },
    thoughts: [thoughtSchema],
    // - `friends`
    //   - Array of `_id` values referencing the `User` model (self-reference)
    friends: [userSchema],
  },
  {
    // what is this again?
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("getUserFriends").get(function () {
  return `friend:${this.user}`;
});
// where is this supposed to go?
friendCount
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.tags.length;
  });

const User = model("user", userSchema);

module.exports = User;

// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
