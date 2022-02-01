const Order = require("../models/order");
const getOrders = async () => {
  try {
    return await Order.find();
  } catch (error) {
    throw { error: "Error while trying to fetch orders!", details: error };
  }
};

const getOrder = async (id) => {
  try {
    const order = await Order.findById(id);
    if (!order) throw "Order does not exist!";
    return order;
  } catch (error) {
    throw { error: "Error while trying to fetch order!", details: error };
  }
};

const addOrder = async (order) => {
  try {
    const newOrder = new Order(order);
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (err) {
    throw { error: "Error adding order", details: error };
  }
};

module.exports = {
  getOrders,
  getOrder,
  addOrder,
};
