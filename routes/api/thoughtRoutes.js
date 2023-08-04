const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route("/:id").get(getSingleThought).delete(deleteThought).put(updateThought);

router.route("/:thoughtid/reactions").post(createReaction);

router.route("/:thoughtid/reactions/:reactionid").delete(deleteReaction);

module.exports = router;
