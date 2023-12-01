const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose

const UserSchema = new Schema({
  userUid: {
    type: String,
    unique: true,
  },
  email: String,
  stores: [
    {
      type: Schema.Types.ObjectId,
      ref: "Store",
      unique:true
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
