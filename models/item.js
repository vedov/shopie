const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = require("./review").ReviewSchema;
const TagSchema = require("./tag").TagSchema;

const ItemSchema = new Schema({
  shop: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: "ItemType",
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  ],
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  stock: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  datePublished: {
    type: Date,
    default: Date.now,
  },
  review: [ReviewSchema],
});
const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
