const router = require("express").Router();
const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");
const verifyLogin = require("../middleware/verifyLogin");

// Created
router.post("/", verifyLogin, async (req, res) => {
  const { isAdmin } = req.user;
  console.log(req.body)
  if (isAdmin) {
    const newMovie = new Movie(req.body);

    try {
      const savedMovie = await newMovie.save();
      return res.status(200).json(savedMovie);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("Your are not  allowed!");
  }
});

// Update

router.put("/:id", verifyLogin, async (req, res) => {
  const { isAdmin } = req.user;
  const { id } = req.params;

  if (isAdmin) {
    try {
      const updateMovie = await Movie.findByIdAndUpdate(
        { _id: id },
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      return res.status(200).json(updateMovie);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("Your are not  allowed!");
  }
});

// Delete

router.delete("/:id", verifyLogin, async (req, res) => {
  const { isAdmin } = req.user;
  const { id } = req.params;

  if (isAdmin) {
    try {
      await Movie.findByIdAndDelete({ _id: id });
      return res.status(200).json("The movie has been deleted...!");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("Your are not  allowed!");
  }
});

// GET
router.get("/find/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById({ _id: id });
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
  }
});

// GET Random

router.get("/randam", verifyLogin, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    }else{
        movie = await Movie.aggregate([
            { $match: { isSeries: false } },
            { $sample: { size: 1 } },
          ]);
    }

    return res.status(200).json(movie)
  } catch (error) {
    console.log(error);
  }
});

// Get All

router.get("/", verifyLogin, async (req, res) => {
  const { isAdmin } = req.user;
  const { id } = req.params;

  if (isAdmin) {
    try {
      const moviesAll = await Movie.find();
      return res.status(200).json(moviesAll.reverse());
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("Your are not  allowed!");
  }
});

module.exports = router;
