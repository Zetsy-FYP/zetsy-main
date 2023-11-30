const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  users: [
    {
      uid: String,
      ref: 'User'
    },
  ],
});

module.exports = mongoose.model("Store", StoreSchema);