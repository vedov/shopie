const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: "Item", required: true }],
});

const WishList = mongoose.model("WishList", WishListSchema);

module.exports = WishList;
