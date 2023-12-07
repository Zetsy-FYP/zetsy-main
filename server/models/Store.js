const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const StoreSchema = new Schema({
  storeName: String,

  // products: [
  //     {
  //         type: Schema.Types.ObjectId,
  //         ref: 'Product',
  //     },
  // ],
  // analytics: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Analytics',
  // },
  // payment: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Payment',
  // },
  storeUrl: String,
  storeLogoUrl: String,
  users: [
    {
      user: {
        type: String,
        ref: "User",
      },
      role: String
    },
  ],
});

module.exports = mongoose.model("Store", StoreSchema);
