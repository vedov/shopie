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
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: "ItemType",
  },
  shortDesc: {
    type: String,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  imageUrls: [
    {
      type: String,
    },
  ],
  stock: {
    type: Number,
  },
  price: {
    type: Number,
  },
  datePublished: {
    type: Date,
    default: Date.now,
  },
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
