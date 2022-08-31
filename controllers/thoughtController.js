const { User, Thought } = require("../models");

module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId });
    Selection("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "that hasn't been thunk yet" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.lost(err);
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
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.body } }
    ).then((reaction) =>
      !reaction
        ? res.status(404).json({ message: "can not find that thought" })
        : res.json(reaction)
    );
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: req.body } }
    ).then((reaction) =>
      !reaction
        ? res.status(404).json({ message: "can not find that thought" })
        : res.json(reaction)
    );
  },
};
