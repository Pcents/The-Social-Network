const { User, Thought } = require("../models");
const reaction = require("../models/Reaction");

module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .populate("reactions")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate("reactions")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "that hasn't been thunk yet" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "thought cannot be added to a non-existent user",
            })
          : res.json("thought added to user")
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteSingleThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(() => res.json({ message: "it has been forgotten" }))
      .catch((err) => res.status(500).json(err));
  },
  updateSingleThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "you changed it!" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createReaction(req, res) {
    // Thought.findOneAndUpdate(req.body)
    //   .then((reaction) => {
    //     return Thought.findOneAndUpdate(
    //       { _id: req.body.thoughtId },
    //       { $addToSet: { reactions: reaction._id } },
    //       { new: true }
    //     );
    //   })
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    ).then((reaction) =>
      !reaction
        ? res.status(404).json({ message: "can not find that thought" })
        : res.json(reaction)
    );
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactionBody: req.body } }
    ).then((reaction) =>
      !reaction
        ? res.status(404).json({ message: "can not find that thought" })
        : res.json(reaction)
    );
  },
};
