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
  users: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Store", StoreSchema);
