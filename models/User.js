const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/],
    },
    thought: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friend: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual("friends").get(function () {
  return this.friend.length;
});

const User = model('user', userSchema);

module.exports = User;
