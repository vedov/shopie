const Order = require("../models/order");
const getShopOrders = async (user) => {
  try {
    const orders = await Order.find()
      .sort({ orderDate: -1 })
      .populate("orderItems", "-__v")
      .populate("customer", "-__v");

    let shopOrders = [];
    for (order of orders) {
      for (item of order.orderItems) {
        if (user._id.toString() == item.shop.toString()) {
          shopOrders.push(order);
        }
      }
    }
    return shopOrders;
  } catch (error) {
    throw { error: "Error while trying to fetch orders!", details: error };
  }
};

const getCustomerOrders = async (user) => {
  try {
    const orders = await Order.find()
      .sort({ orderDate: -1 })
      .populate("orderItems", "-__v")
      .populate("customer", "-__v");

    let customerOrders = [];

    for (order of orders) {
      if (user._id.toString() == order.customer._id.toString()) {
        customerOrders.push(order);
      }
    }

    return customerOrders;
  } catch (error) {
    throw { error: "Error while trying to fetch orders!", details: error };
  }
};

const getCompletedOrders = async (user) => {
  try {
    const orders = await Order.find()
      .populate("orderItems", "-__v")
      .populate("customer", "-__v");

    let completedOrders = [];
    for (order of orders) {
      for (item of order.orderItems) {
        if (user._id.toString() == item.shop.toString()) {
          if (order.orderStatus == "Received") completedOrders.push(order);
        }
      }
    }
    return completedOrders;
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
  getShopOrders,
  getCustomerOrders,
  getOrder,
  addOrder,
  setOrderStatus,
  getCompletedOrders,
};
