const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000; 
const mongoose = require("mongoose");
const Cors = require("cors")
const path = require("path")


mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

require("./models/Users");
require("./models/Movies");
require("./models/Lists");

app.use(Cors());
app.use(express.json());

app.use("/api/auth",require("./routes/auth"));
app.use("/api/users", require("./routes/users"))
app.use("/api/movies", require("./routes/movies"))
app.use("/api/lists", require("./routes/lists"))

if(process.env.NODE_ENV === "production"){
  app.use(express.static("frontend/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"client", "build","index.html" ))
  })
  app.use(express.static( "adminPanel/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"adminPanel", "build","index.html" ))
  })
  
}

app.listen(PORT, () => {
  console.log("Server listen on port " + PORT);
});
