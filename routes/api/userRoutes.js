const router = require("express").Router();

const {
  getUsers,
  createUser,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  createFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);
router
  .route("/:userId")
  .get(getSingleUser)
  .delete(deleteSingleUser)
  .put(updateSingleUser);

router
  .route("/:userId/friends/:friendId")
  .post(createFriend)
  .delete(removeFriend);

module.exports = router;
