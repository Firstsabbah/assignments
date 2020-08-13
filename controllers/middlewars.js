const User = require("../models/userModel");

function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

async function protectDataClerk(req, res, next) {
  const dataClerk = await User.findOne({
    _id: req.session.user.id,
    role: "dataclerk",
  });
  if (dataClerk) {
    req.session.user.role = "dataclerk";
    next();
  } else {
    res.redirect("/dashboard");
  }
}

module.exports = { isAuthenticated, protectDataClerk };
