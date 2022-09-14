const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcryptjs = require("bcryptjs");
const verifyLogin = require("../middleware/verifyLogin");

// User Update
router.put("/:id", verifyLogin, async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const picture = req.body?.profilePic;
  console.log(req.body)
  if (_id.toString() === id ) {
    try {
      const hashPass = await bcryptjs.hashSync(req.body.password, 10);

       await User.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name: req.body?.name,
            email: req.body?.email,
            password: hashPass,
            profilePic: picture
          },
        },
        { new: true }
      );
       const updateUser = await User.findById({_id:id})
       const {password, ...resultUser}= updateUser._doc
      return res.status(200).json(resultUser);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("Your can update only  your account!");
  }
});

// Delete
router.delete("/:id", verifyLogin, async (req, res) => {
  const { id } = req.params;
  const { _id, isAdmin } = req.user;
  const password = req.body?.password;

  if (_id.toString() === id || isAdmin) {
    try {
      await User.findByIdAndDelete({ _id: id });
      res.status(200).json("User has deleted...");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("Your can delete only  your account!");
  }
});

// Get

router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userFind = await User.findById({ _id: id });

    const { password, ...userInfo } = userFind._doc;

    res.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
  }
});

// Get All

router.get("/", verifyLogin, async (req, res) => {
  const query = req.query.new;
  if (req.user?.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("You are nowt allow to see all users!");
  }
});

// User Stats

router.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);
  
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
