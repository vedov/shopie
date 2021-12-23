const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: Schema.Types.ObjectId,
    ref: "OrderStatus",
    required: true,
  },
  orderReview: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
});

OrderSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
