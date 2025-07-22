const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const priavteKey = process.env.JWT_KEY;
const generateToken = (userId) => {
  try {
    const token = jwt.sign(
      {
        id: userId
      },
      priavteKey,
      { expiresIn: "7d" }
    );
    return token;
  } catch (err) {
    throw new Error("Error creating token",err);
  }
};

module.exports = generateToken;