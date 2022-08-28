const { User, Thought } = require("../models");
const { ObjectId } = require("mongoose").Types;

// this is maybe to get all the thoughts associated with a user
// const userThoughts = async () =>
//   User.aggregate([
//     { $match: { _id: { $in: ObjectId } } },
//     { $group: { _id: null, count: { $sum: 1 } } },
//   ]);

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
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
};
