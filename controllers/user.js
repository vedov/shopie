const { default: jwtDecode } = require("jwt-decode");
const userService = require("../services/users");
const categoryService = require("../services/categories");
const itemTypeService = require("../services/itemType");
const itemService = require("../services/items.js");
let token, jwt_decode, currentUser;

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
    token = req.cookies.token;
    jwt_decode = await jwtDecode(token);
    currentUser = jwt_decode.user;
    const userType = await userService.getUserTypeById(
      jwt_decode.user.userType
    );
    const test = await userService.getUser(currentUser.id);
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

    if (userType == "Customer")
      res.render("customerDashboard", {
        user: currentUser,
      });
    else if (userType == "Shop")
      res.render("shopDashboard", {
        user: currentUser,
        categories: categories,
        types: types,
      });
    else res.render("adminDashboard", { user: currentUser });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getOrders = async (req, res) => {
  try {
    //Ternarni operator i da renderuje dashboard u odnosu na tip usera
    res.render("orders", {});
    /* const user = await userService.getUser(req.params.id);
    res.status(200).json(user); */
  } catch (error) {
    res.status(404).json(error);
  }
};

const getSettings = async (req, res) => {
  try {
    //Ternarni operator i da renderuje dashboard u odnosu na tip usera
    res.render("settings", {});
    /* const user = await userService.getUser(req.params.id);
    res.status(200).json(user); */
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

const addUserInterest = async (user, interest) => {
  try {
    console.log("...............", user, user.interest);
  } catch (err) {
    throw { error: "Error adding interest", details: error };
  }
};

const saveUserInterests = async (user, interests) => {
  user.interests = interests;
};
const getInterestSelect = async (req, res) => {
  const interests = await InterestService.getInterests();
  res.render("userinterests", { interests: interests });
};

const deleteUser = async (req, res) => {
  try {
    const removedUser = await userService.deleteUser(req.params.id);
    console.log("Deleted:", req.params.id);
    res.redirect("user/users");
    /* res.status(200).json(removedUser); */
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
  getOrders,
  getSettings,
  addUserInterest,
};
