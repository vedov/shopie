const orderService = require("../services/orders");
const userService = require("../services/users");
const itemService = require("../services/items");
const { default: jwtDecode } = require("jwt-decode");
const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    const jwt_decode = await jwtDecode(token);
    const currentUser = await userService.getUser(jwt_decode.user.id);
    return currentUser;
  } catch (error) {
    res.status(404).json(error);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    const currentUser = await getCurrentUser(req, res);

    res.render("orders", {
      orders: orders,
      shop: currentUser,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await orderService.getOrder(req.params.id);
    res.status(200).json(order);
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
