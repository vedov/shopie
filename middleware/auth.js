const jwt = require("jsonwebtoken");
const { check, body, oneOf, validationResult } = require("express-validator");
const cookieParser = require("cookie-parser");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      res.status(401).json({ error: "Unauthorized access!" }).end();
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const verifyCookie = async (req, res) => {
  try {
    console.log("aaaaaaaaa", req.cookies["token"]);
    const cookie = req.cookies["token"];
    if (!cookie) {
      res.status(401).json({ error: "Unauthorized access!" }).end();
      return;
    }
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const verifyCorrectUser = async (req, res, next) => {
  try {
    if (!req.header("reset")) {
      const token = req.header("x-auth-token");
      if (!token) {
        // 401
        res.status(401).json({ error: "Unauthorized access!" }).end();
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.user.id !== req.params.id) {
        res.status(401).json({ error: "Unauthorized access!" }).end();
        return;
      }
    }

    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = {
  verifyToken,
  verifyCookie,
  verifyCorrectUser,
};
