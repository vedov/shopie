const Order = require("../models/order");
const getOrders = async (user) => {
  try {
    const orders = await Order.find()
      .populate("orderItems", "-__v")
      .populate("customer", "-__v");

    let userOrders = [];
    for (order of orders) {
      for (item of order.orderItems) {
        if (user._id.toString() == item.shop.toString()) {
          userOrders.push(order);
        }
      }
    }
    return userOrders;
  } catch (error) {
    throw { error: "Error while trying to fetch orders!", details: error };
  }
};

const getAcceptedOrders = async (user) => {
  try {
    const orders = await Order.find()
      .populate("orderItems", "-__v")
      .populate("customer", "-__v");

    let acceptedOrders = [];
    for (order of orders) {
      for (item of order.orderItems) {
        if (user._id.toString() == item.shop.toString()) {
          if (order.orderStatus == "Accepted") acceptedOrders.push(order);
        }
      }
    }
    return acceptedOrders;
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

const setOrderStatus = async (id, status) => {
  try {
    const order = await Order.findById(id);
    console.log(status);
    order.orderStatus = status;
    order.save();
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
  setOrderStatus,
  getAcceptedOrders,
};
