const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userid
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userid/friends/:friendid
router.route("/:userid/friends/:friendid").post(addFriend).delete(removeFriend);

module.exports = router;
