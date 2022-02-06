require("dotenv").config();
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
require("./mongodb");

const app = express();

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const userRouter = require("./routes/user");
const itemRouter = require("./routes/item");
const categoryRouter = require("./routes/category");
const interestRouter = require("./routes/interest");
const itemTypeRouter = require("./routes/itemType");

const PORT = process.env.PORT;
const http = require("http");
let socketio = require("./socketio");

// View engine setup
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/admin"),
  path.join(__dirname, "views/customer"),
  path.join(__dirname, "views/shop"),
  path.join(__dirname, "views/customer"),
  path.join(__dirname, "views/landing"),
  path.join(__dirname, "views/user"),
]);

app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/item", itemRouter);
app.use("/category", categoryRouter);
app.use("/interest", interestRouter);
app.use("/itemtype", itemTypeRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render(err);
});

var server = http.createServer(app);
socketio.io.attach(server);

server.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);

module.exports = app;
