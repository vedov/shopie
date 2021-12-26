const userService = require("../services/users");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
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
    //Ternarni operator i da renderuje dashboard u odnosu na tip usera
    res.render("tables", {});
    /* const user = await userService.getUser(req.params.id);
    res.status(200).json(user); */
  } catch (error) {
    res.status(404).json(error);
  }
};

const getCatalogue = async (req, res) => {
  try {
    //Ternarni operator i da renderuje dashboard u odnosu na tip usera
    res.render("catalogue", {});
    /* const user = await userService.getUser(req.params.id);
    res.status(200).json(user); */
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

const deleteUser = async (req, res) => {
  try {
    const removedUser = await userService.deleteUser(req.params.id);
    res.status(200).json(removedUser);
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
  getCatalogue,
  getOrders,
  getSettings,
};
