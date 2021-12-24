const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = require("./location").LocationSchema;
const ItemSchema = require("./item").ItemSchema;
const ReviewSchema = require("./review").ReviewSchema;

const ShopSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  store: [LocationSchema],
  catalogue: [ItemSchema],
  review: [ReviewSchema],
  revenue: {
    type: Number,
  },
});
const Shop = mongoose.model("Shop", ShopSchema);

module.exports = Shop;
