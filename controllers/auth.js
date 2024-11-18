const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getHome = (req, res, next) => {
  res.status(200);
  res.render("home");
};

exports.getSignUpForm = (req, res, next) => {
  res.status(200);
  res.render("signup");
};

exports.postSignUpForm = async (req, res, next) => {
  const { username, email, password } = req.body;
  const findUser = await User.findOne({ where: { email: email } });
  if (findUser) {
    return res.redirect("/signup");
  }
  const hashPsw = await bcrypt.hash(password, 12);
  const newUser = User.build({ username, email, password: hashPsw });
  await newUser.save();
  res.status(200);
  res.redirect("/login");
};

exports.getLogInForm = (req, res, next) => {
  res.status(200);
  res.render("login");
};

exports.postLogInForm = async (req, res, next) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ where: { email: email } });
  if (!findUser) {
    return res.redirect("/signup");
  }
  const isMatch = await bcrypt.compare(password, findUser.password);
  if (!isMatch) {
    return res.redirect("/signup");
  }
  req.session.isAuth = true;
  res.status(202);
  res.redirect("/dashboard");
};

exports.getDashboard = (req, res, next) => {
  res.status(200);
  res.render("dashboard");
};

exports.postLogOut = (req, res, next) => {
  req.session.destroy(() => {
    return res.redirect("/");
  });
};
