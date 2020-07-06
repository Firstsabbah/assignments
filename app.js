const express = require("express");
const nodemailer = require('nodemailer');
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
app.post('/register', async (req, res) => {
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
    let email = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'assignment.hesam@gmail.com',
        pass: 'Hesam123456789'
      }
    });
    const mailOption = {
      from: ' assignment.hesam@gmail.com',
      to: req.body.email,
      subject: 'welcome message',
      text: `hello ${req.body.firstname} welcome to our website`
    };

    try {
      await email.sendMail(mailOption)
    } catch (err) {
      console.log('email wan not send');
    }
    infos = {
      "firstname": req.body.firstname,
      "lastname": req.body.lastname,
      "email": req.body.email
    }
    res.redirect('/dashboard')
  }
})
app.get('/dashboard', (req, res) => {
  res.render('dashboard', infos)
})
app.listen(8000, () => {
  console.log("server started...");
});
