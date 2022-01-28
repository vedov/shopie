const AuthService = require("../services/auths");
const UserService = require("../services/users");
const InterestService = require("../services/interests");
const jwt = require("jsonwebtoken");
const { default: jwtDecode } = require("jwt-decode");
const Interest = require("../models/interest");
let token, jwt_decode, currentUser;
const login = async (req, res) => {
  const { login, password } = req.body;
  try {
    try {
      const token = await AuthService.loginUsers(login, password);

      console.log(token);

      /* res.status(200).send({ token }).end(); */
      res.cookie("token", token);
      console.log("prosao");
      res.redirect("/user");
    } catch (error) {
      res.status(404).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const register = async (req, res) => {
  const user = req.body;
  if (!user.email) {
    res
      .status(404)
      .send({
        error: "Email can not be empty!",
      })
      .end();

    return;
  }

  try {
    if (await UserService.doesUserExist(user.email))
      throw { error: "Email already exists!" };
    if (await UserService.doesUserExist(user.username))
      throw { error: "Username already exists!" };

    const UserType = await UserService.getUserType(user.userType);
    user.userType = UserType;

    const newUser = await UserService.addUser(user);
    const token = await AuthService.createToken(newUser);
    res.cookie("token", token);
    res.status(201).send({ token, user: newUser });
    console.log(newUser);
  } catch (error) {
    res.status(400).send(error).end();
  }
};

const getRegister = async (req, res) => {
  res.render("register");
};
const getInterestSelect = async (req, res) => {
  const interests = await InterestService.getInterests();
  res.render("userinterests", { interests: interests });
};
const addUserInterest = async (req, res) => {
  try {
    token = req.cookies.token;
    jwt_decode = await jwtDecode(token);
    currentUser = jwt_decode.user;
    const user = await UserService.getUser(currentUser.id);
    const interests = req.body.interests;

    console.log(interests);

    user = await UserService.editUser(currentUser.id, interests);

    res.status(200).json({ message: "Interest added Succesfully" }).end();
  } catch (error) {
    res.status(400).send(error).end();
  }
};

const getLogin = async (req, res) => {
  res.render("login");
};

module.exports = {
  getRegister,
  register,
  getLogin,
  login,
  getInterestSelect,
  addUserInterest,
};
