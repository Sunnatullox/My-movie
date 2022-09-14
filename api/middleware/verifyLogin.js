const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const User = mongoose.model("User")



module.exports = async(req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "please register first" });
    return
  }

  try {

      const token = await authorization.replace("Sunna ", "");
      jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
          res.status(401).json({ error: "please register first" });
          return 
        }
    
        const { _id } = payload;
       const user = await User.findById({_id:_id})
        req.user = user
        next()
      });

  } catch (error) {
    console.log(error)
  }
};
