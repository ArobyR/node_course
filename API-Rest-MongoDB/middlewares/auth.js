const jwt = require("jsonwebtoken")
const config = require("config")

const tokenValidation = (req, res, next) => {
  const token = req.get("Auth")
  jwt.verify(token, config.get("configToken.SEED"), (err, decoded) => {
    if (err) {
      return res.status(401).json(err)
    }
    req.user_name = decoded.user_name
   next()
  })
}

module.exports = tokenValidation;