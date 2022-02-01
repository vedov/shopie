const orderService = require("../services/orders");
const userService = require("../services/users");
const itemService = require("../services/items");
const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();

    res.render("orders", {
      orders: orders,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getOrder = async (req, res) => {
  try {
    const tag = await orderService.getOrder(req.params.id);
    res.status(200).json(tag);
  } catch (error) {
    res.status(404).json(error);
  }
};

const addOrder = async (req, res) => {
  try {
    const customer = await userService.getUser(req.body.customerInput);
    const price = req.body.priceInput;
    const itemData = req.body.itemsInput;
    let tempItems = [];
    let items = [];
    tempItems = itemData.split(",");

    for (item of tempItems) {
      const temp = await itemService.getItem(item);
      items.push(temp);
    }

    const savedOrder = await orderService.addOrder({
      customer: customer,
      orderItems: items,
      price: price,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getOrders,
  getOrder,
  addOrder,
};
