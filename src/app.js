const express = require("express");
const role = require("./router/role.router");
const user = require("./router/user.router");
const book = require("./router/livre.router");
const auth = require("./router/auth.router");

const app = express();

app.use("/auth", auth);
app.use("/role", role);
app.use("/user", user);
app.use("/book", book);

module.exports = app;
