const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    reguired: true,
    uniqure: true,
    minlength: 3,
  },
  favouriteGenre: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
