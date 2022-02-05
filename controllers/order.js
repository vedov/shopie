const orderService = require("../services/orders");
const userService = require("../services/users");
const itemService = require("../services/items");
const cartService = require("../services/carts");
const {
  sendMailToCustomer,
  sendOrderMailToCustomer,
} = require("../middleware/nodemailer");
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
    const currentUser = await getCurrentUser(req, res);
    const userType = await userService.getUserTypeById(currentUser.userType);
    let orders = [];
    if (userType == "Shop") {
      orders = await orderService.getShopOrders(currentUser);
    } else if (userType == "Customer") {
      orders = await orderService.getCustomerOrders(currentUser);
    }
    res.render("orders", {
      orders: orders,
      user: currentUser,
      userType: userType,
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
    sendOrderMailToCustomer(customer.email);

    const savedOrder = await orderService.addOrder({
      customer: customer,
      orderItems: items,
      price: price,
    });
    //const cart = await cartService.clearCart(customer._id);
    res.redirect("/user/orders");
  } catch (error) {
    res.status(400).json(error);
  }
};

const setOrderStatus = async (req, res) => {
  try {
    const order = await orderService.getOrder(req.params.id);
    const customer = await userService.getUser(order.customer);
    let shops = [];

    let status = "Pending";
    for (i = 0; i < order.orderItems.length; i++) {
      const item = await itemService.getItem(order.orderItems[i]);
      shops.push(item.shop);
    }
    if (req.body.accepted) {
      status = req.body.accepted;
      sendMailToCustomer(customer.email);
    }
    if (req.body.refused) status = req.body.refused;
    if (req.body.received) {
      status = req.body.received;
      for (i = 0; i < shops.length; i++) {
        const shop = await userService.getUser(shops[i]);
        const item = await itemService.getItem(order.orderItems[i]);
        let revenue = shop.revenue;
        revenue += item.price;
        await userService.addToUserRevenue(shop._id, revenue);
      }
    }
    if (req.body.cancelled) status = req.body.cancelled;
    const result = status.charAt(0).toUpperCase() + status.slice(1);
    await orderService.setOrderStatus(order, result);

    res.redirect("back");
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getOrders,
  getOrder,
  addOrder,
  setOrderStatus,
};
