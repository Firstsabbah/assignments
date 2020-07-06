const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
app.use(express.json());
app.use(express.static("./public"));
app.engine("handlebars", handlebars({ defaultLayout: "template" }));
app.set("view engine", "handlebars");
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/meal-packages", (req, res) => {
  res.render("packages");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.listen(8000, () => {
  console.log("server started...");
});
