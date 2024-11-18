const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");

router.get("/", authController.getHome);

router.get("/signup", authController.getSignUpForm);

router.post("/signup", authController.postSignUpForm);

router.get("/login", authController.getLogInForm);

router.post("/login", authController.postLogInForm);

router.get("/dashboard", isAuth, authController.getDashboard);

router.post("/logout", authController.postLogOut);

module.exports = router;
