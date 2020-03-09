const Jwt = require('jsonwebtoken');
const mongoDb = require("mongodb");

module.exports = ((req, res, next) => {

  // const token = req.get("Authorization").split(" ")[1];
  // let decodedToken;
  // try {
  //     decodedToken = Jwt.verify(token, "ManyPostsManyPostsManyPosts");
  // } catch (err) {
  //     err.statusCode = 500;
  //     throw err;
  // }
  // if (!decodedToken) {
  //     const error = new Error("Not Authenticated");
  //     error.statusCode = 401;
  //     throw error;
  // }
  // req.userId = decodedToken.userId;
  // req.userName = decodedToken.creatorName;

  req.userId = "123456";
  req.userName = "Mina";
  next();
});