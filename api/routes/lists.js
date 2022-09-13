const router = require("express").Router();
const mongoose = require("mongoose");
const List = mongoose.model("List");
const verifyLogin = require("../middleware/verifyLogin");

// Created
router.post("/", verifyLogin, async (req, res) => {
  const { isAdmin } = req.user;

  if (isAdmin) {
    const newList = new List(req.body);

    try {
      const savedList = await newList.save();
      return res.status(200).json(savedList);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("Your are not  allowed!");
  }
});

// DELETE

router.delete("/:id", verifyLogin, async (req, res) => {
  const { isAdmin } = req.user;
  const { id } = req.params;

  if (isAdmin) {
    try {
      await List.findByIdAndDelete({ _id: id });
      return res.status(200).json("The List has been deleted...!");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("Your are not  allowed!");
  }
});

// GET

router.get("/", verifyLogin, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    return res.status(200).json(list)
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
