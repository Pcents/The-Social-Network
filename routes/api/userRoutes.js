const router = require("express").Router();

const {
  getUsers,
  createUser,
  getSingleUser,
  deleteSingleUser,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser).delete(deleteSingleUser);

module.exports = router;
