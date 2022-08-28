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
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
