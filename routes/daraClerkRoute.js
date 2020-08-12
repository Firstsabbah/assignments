const {
  createPackage,
  dataClerk,
  getAllPackages,
  editPackage,
  getEditPackage,
  deletePackage,
  upload,
} = require("../controllers/dataClerkController");
const express = require("express");
const route = express.Router();

route.get("/data-clerk", dataClerk);
route.get("/all-packages", getAllPackages);
route.post("/all-packages", upload, createPackage);
route.get("/edit-package/:id", getEditPackage);
route.post("/edit-package/:id", upload, editPackage);
route.get("/delete-package/:id", deletePackage);

module.exports = route;
