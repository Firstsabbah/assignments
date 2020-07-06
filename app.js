const express = require("express");
const url = require('url');
const handlebars = require("express-handlebars");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
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
app.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.render("login", { message: 'invalid input' })
  }
  else {
    res.redirect("/")
  }
})

let infos;
app.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname) {
    res.render("register", { message: 'invalid input' })
  }
  else if (req.body.password.length < 6 || req.body.password.length > 12) {
    res.render("register", { message: 'password must be 6 to 12 character' })
  }
  else if ((!req.body.password.match(/[a-z]/g) || !req.body.password.match(/[A-Z]/g)) && !req.body.password.match(/[1-9]/g)) {
    res.render("register", { message: 'password must contain digits and characters' })
  }
  else if (!req.body.email.includes('@')) {
    res.render("register", { message: 'please enter valid email' })
  } else {
    infos = {
      "firstname": req.body.firstname,
      "lastname": req.body.lastname,
      "email": req.body.email
    }
    res.redirect('/dashboard')
  }
})
app.get('/dashboard', (req, res) => {
  console.log(infos);

  res.render('dashboard', infos)
})
app.listen(8000, () => {
  console.log("server started...");
});
