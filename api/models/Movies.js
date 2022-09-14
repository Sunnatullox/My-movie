const mongoose = require("mongoose");


const MovieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    descr: {
      type: String,
    },
    img: {
      type: String,
      required: false,
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
    imgTitle: String,
    imgSm: String,
    trailer: String,
    video: String,
    year: String,
    limit: Number,
    genre: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
