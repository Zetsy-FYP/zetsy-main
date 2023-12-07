const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose

const UserSchema = new Schema({
  userUid: {
    type: String,
    unique: true,
  },
  role: String,
  email: String
});

module.exports = mongoose.model("User", UserSchema);
