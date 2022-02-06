const { default: jwtDecode } = require("jwt-decode");
const userService = require("../services/users");
const categoryService = require("../services/categories");
const itemTypeService = require("../services/itemType");
const itemService = require("../services/items.js");
const orderService = require("../services/orders");

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

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    res.render("users", {
      users: users,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    const userType = await userService.getUserTypeById(user.userType);

    if (userType == "Shop") {
      let items;
      if (req.params.category) {
        items = await itemService.getCatalogueByCategory(
          user._id,
          req.params.category
        );
      } else {
        items = await itemService.getCatalogue(user._id);
      }

      const completed = await orderService.getCompletedOrders(user);
      const orders = await orderService.getShopOrders(user);
      const categoriesData = await categoryService.getCategories(req, res);
      const typesData = await itemTypeService.getItemTypes(req, res);
      let categories = [];
      let types = [];
      categoriesData.forEach(function (item) {
        categories.push(item);
      });
      typesData.forEach(function (item) {
        types.push(item);
      });
      res.render("shop", {
        user: user,
        products: items,
        itemsCount: items.length,
        acceptedCount: completed.length,
        ordersCount: orders.length,
        categories: categories,
        types: types,
      });
    }
    if (userType == "Customer") {
      res.render("user", {
        user: user,
      });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getDashboard = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req, res);
    const userType = await userService.getUserTypeById(currentUser.userType);
    const categoriesData = await categoryService.getCategories(req, res);
    const typesData = await itemTypeService.getItemTypes(req, res);

    let categories = [];
    let types = [];
    categoriesData.forEach(function (item) {
      categories.push(item);
    });
    typesData.forEach(function (item) {
      types.push(item);
    });

    if (userType == "Customer") {
      const shops = [];
      const allusers = await userService.getUsers();
      for (user of allusers) {
        if ((await userService.getUserTypeById(user.userType)) == "Shop") {
          shops.push(user);
        }
      }
      res.render("customerDashboard", {
        user: currentUser,
        shops: shops,
      });
    } else if (userType == "Shop") {
      const items = await itemService.getCatalogue(currentUser._id);
      const completed = await orderService.getCompletedOrders(currentUser);
      const orders = await orderService.getShopOrders(currentUser);

      res.render("shopDashboard", {
        user: currentUser,
        categories: categories,
        types: types,
        nrItems: items.length,
        nrCompleted: completed.length,
        nrOrders: orders.length,
      });
    } else {
      const users = await userService.getUsers();
      const items = await itemService.getItems();
      let customers = [];
      let shops = [];
      let tags = [];
      let completedOrders = [];
      let shopOrders = [];
      let customerOrders = [];
      for (key of users) {
        const typeCheck = await userService.getUserTypeById(key.userType);
        const completed = await orderService.getCompletedOrders(key);
        completedOrders.push(completed);
        if (typeCheck == "Customer") {
          const orders = await orderService.getCustomerOrders(key);
          customerOrders.push(orders);
          customers.push(typeCheck);
        }
        if (typeCheck == "Shop") {
          const orders = await orderService.getShopOrders(key);
          shopOrders.push(orders);
          shops.push(typeCheck);
        }
      }
      for (key of items) {
        for (tag of key.tags) {
          tags.push(tag);
        }
      }

      res.render("adminDashboard", {
        user: currentUser,
        nrUsers: users.length,
        nrItems: items.length,
        nrCustomers: customers.length,
        nrShops: shops.length,
        nrCompleted: completedOrders.length,
        nrShopOrders: shopOrders.length,
        nrCustomerOrders: customerOrders.length,
        nrTags: tags.length,
      });
      /* 
        ,
         */
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const getSettings = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req, res);

    const userType = await userService.getUserTypeById(currentUser.userType);

    let orders;
    if (userType == "Shop") {
      orders = await orderService.getShopOrders(currentUser);
    }
    if (userType == "Customer") {
      orders = await orderService.getCustomerOrders(currentUser);
    }
    const items = await itemService.getCatalogue(currentUser._id);
    const accepted = await orderService.getCompletedOrders(currentUser);
    res.render("settings", {
      user: currentUser,
      itemsCount: items.length,
      ordersCount: orders.length,
      acceptedCount: accepted.length,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const addUser = async (req, res) => {
  try {
    if (await userService.doesUserExist(req.body.email))
      throw { error: "Email already exists!" };
    const savedUser = await userService.addUser({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const editUser = async (req, res) => {
  try {
    const updatedUser = await userService.editUser(req.params.id, req.body);
    res.status(201).json(updatedUser);
  } catch (error) {
    if (error.details === "User does not exist!") res.status(404).json(error);
    res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const removedUser = await userService.deleteUser(req.params.id);
    console.log("Deleted:", req.params.id);
    res.redirect("back");
    /* res.status(200).json(removedUser); */
  } catch (error) {
    res.status(404).json(error);
  }
};

const archiveUser = async (req, res) => {
  try {
    const archivedUser = await userService.archiveUser(req.params.id);
    console.log("Archived:", req.params.id);
    res.redirect("back");
  } catch (error) {
    res.status(404).json(error);
  }
};

const getMessages = async (req, res) => {
  try {
    const currentUser = await getCurrentUser(req, res);
    const users = await userService.getUsers(req, res);

    res.render("messages", { currentUser: currentUser, users: users });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
  getUserByEmail,
  getDashboard,
  getSettings,
  getUserProfile,
  archiveUser,
  getMessages,
};
