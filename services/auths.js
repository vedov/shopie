const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

class AuthService {
  static async createToken(user) {
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
      },
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
  }

  static async loginUsers(login, password) {
    const user = await User.findOne({ email: login });
    if (!user) {
      throw { error: "User doesn't exist!" };
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw { error: "Incorrect credentials!" };
    }
    return this.createToken(user);
  }
}

module.exports = AuthService;
