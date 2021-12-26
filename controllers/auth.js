const AuthService = require("../services/auths");
const UserService = require("../services/users");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { login, password } = req.body;
  try {
    try {
      const token = await AuthService.loginUsers(login, password);
      res.cookie("token", token);
      res.status(200).send({ token }).end();

      /* res.redirect("/user"); */
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
    res.status(201).send({ token, user: newUser });
  } catch (error) {
    res.status(400).send(error).end();
  }
};

const getRegister = async (req, res) => {
  res.render("interests");
};
const getLogin = async (req, res) => {
  res.render("login");
};

module.exports = {
  getRegister,
  register,
  getLogin,
  login,
};
