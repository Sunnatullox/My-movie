const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(404)
      .json({ error: "Please some line was not filled try again" });
  }

  try {
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      return res
        .status(401)
        .json({ msg: "Sorry, this email has already been registered" });
    }
    let hashPass = await bcrypt.hashSync(password, 10);

    const newUsers = new User({
      name,
      email,
      password: hashPass,
    });
    const users = await newUsers.save();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

// Login

router.post("/login", async (req, res) => {
  const { email } = req.body;
  const passwords = req.body.password;

  if (!email || !passwords) {
    return res
      .status(404)
      .json({ error: "Please some line was not filled try again" });
  }

  try {
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res
        .status(404)
        .json({ msg: "Sorry, no one has registered with this email" });
    }

    const compaerPassUser = await bcrypt.compare(passwords, findUser.password);
    if (!compaerPassUser) {
      res
        .status(404)
        .json({ msg: "Sorry, your password is wrong, please try again" });
    }
    const { password, ...info } = findUser._doc;
    const token = jwt.sign(
      { _id: info._id, isAdmin: info.isAdmin },
      process.env.JWT_SECRET
    );
    return res.status(200).json({ user: { ...info }, token });
  } catch (error) {
    console.log(error);
  }
});
// Login Admin Panel

router.post("/Admin/login", async (req, res) => {
  const { email } = req.body;
  const passwords = req.body.password;

  if (!email || !passwords) {
    res
      .status(404)
      .json({ error: "Please some line was not filled try again" });
    res.send("/admin/login");
    return;
  }

  try {
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      res
        .status(404)
        .json({ msg: "Sorry, no one has registered with this email" });
      res.send("/admin/login");
      return;
    }

    if (findUser.isAdmin !== true) {
      res
        .status(409)
        .json({
          msg: "sorry, you are not an admin, you cannot access the admin panel",
        });
      return;
    }

    const compaerPassUser = await bcrypt.compare(passwords, findUser.password);
    if (!compaerPassUser) {
      res
        .status(404)
        .json({ msg: "Sorry, your password is wrong, please try again" });
      res.send("/admin/login");
    }

    const { password, ...info } = findUser._doc;
    const token = jwt.sign(
      { _id: info._id, isAdmin: info.isAdmin },
      process.env.JWT_SECRET
    );
    return res.status(200).json({ user: { ...info }, token });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
