const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");
const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
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
      validate: [validateEmail, "Real Email Please"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Real Email Please",
      ],
    },
    // i think these break it

    // thoughts: [thoughtSchema],
    // - `friends`
    //   - Array of `_id` values referencing the `User` model (self-reference)
    // friends: [userSchema],
  },
  {
    // what is this again?
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//the below virtual breaks it

// userSchema.virtual("getUserFriends").get(function () {
//   return `friend:${this.user}`;
// });
// // where is this supposed to go?
// friendCount
//   .virtual("friendCount")
//   // Getter
//   .get(function () {
//     return this.tags.length;
//   });

const User = model("user", userSchema);

module.exports = User;

// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
