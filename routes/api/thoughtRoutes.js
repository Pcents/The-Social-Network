const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateSingleThought,
  deleteSingleThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateSingleThought)
  .delete(deleteSingleThought);
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
