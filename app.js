const express = require("express");

const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const clientSessions = require("client-sessions");
const userRoutes = require("./routes/authRoute");
const dataClerkRoutes = require("./routes/daraClerkRoute");
const packageRoutes = require("./routes/packageRoute");
require("dotenv").config({ path: "./config.env" });
const app = express();

mongoose
  .connect(process.env.DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected..."))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(
  clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: "week10example_web322", // this should be a long un-guessable string.
    duration: 15 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60 * 10, // the session will be extended by this many ms each request (1 minute)
  })
);

app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "template",
  })
);
app.set("view engine", "handlebars");
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.isAuth = true;
  }
  next();
});
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/", userRoutes);
app.use("/admin", dataClerkRoutes);
app.use("/meal-packages", packageRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log("server started...");
});
