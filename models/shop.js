const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = require("./user").UserSchema;
const LocationSchema = require("./location").LocationSchema;
const ItemSchema = require("./item").ItemSchema;
const ReviewSchema = require("./review").ReviewSchema;

const ShopSchema = new Schema({
  user: UserSchema,
  store: [LocationSchema],

  catalogue: [ItemSchema],
  rating: {
    type: Number,
  },
  review: [ReviewSchema],
  revenue: {
    type: Number,
  },
});
const Shop = mongoose.model("Shop", ShopSchema);

module.exports = Shop;
