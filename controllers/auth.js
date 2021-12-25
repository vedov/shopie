const AuthService = require("../services/auths");
const UserService = require("../services/users");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { login, password } = req.body;
  console.log(req.body);
  try {
    try {
      const token = await AuthService.loginUsers(login, password);

      console.log(token);
      console.log(login, password);
      res.status(200).send({ token }).end();
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

    const UserType = await UserService.getUserType(user.userType);
    user.userType = UserType;

    const newUser = await UserService.addUser(user);
    const token = await AuthService.createToken(newUser);
    console.log(token);
    res.status(201).send({ token, user: newUser });
  } catch (error) {
    console.log(error);
    res.status(400).send(error).end();
  }
};

const getRegister = async (req, res) => {
  res.render("register");
};
const getLogin = async (req, res) => {
  res.render("login");
};

/* const validate = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      res.status(401).json({ error: "Unauthorized access!" }).end();
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).send(decoded.user);
  } catch (error) {
    res.status(401).send({ error: "Invalid token!" });
  }
};
 */
/* module.exports = {
  login,
  register,
  validate,
};
 */
module.exports = {
  getRegister,
  register,
  getLogin,
  login,
};
