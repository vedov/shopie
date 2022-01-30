const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
