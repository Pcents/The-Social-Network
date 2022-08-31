const { User, Thought } = require("../models");

// friends and update user not working

module.exports = {
  // retrieves all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //   retrieves a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "no user found" })
          : res.json({
              user,
              // do we need to pull in thoughts?
              // thought:await thought(req.params.UserId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //   not updating the body...
  updateSingleUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //   deletes a user
  deleteSingleUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res
              .user(404)
              .json({ message: "Can not delete what does not exist" })
          : Thought.findOneAndUpdate(
              { user: req.params.userId },
              //   $pull operator removes an existing array and all instances of values
              { $pull: { user: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "User deleted, but no thoughts found",
            })
          : res.json({ message: "User gone" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //   needs friend schema or something in models?
  // adds a friend to a user
  createFriend(req, res) {
    console.log("YOU HAVE A FRIEND");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friend: req.body } }
      // no validators needed
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //   delete a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $pull: { friend: { friendId: req.params.friendId } } }
      // validator?
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
