const generateToken = require("../utils/generateToken");
const User = require("../models/User");

const signupController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    if (user) {
      res.status(201).json({
        message: "User Created Successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).json({ message: "Error creating user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const loginController = async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Enter your email and password"});
    }
    try {
        const user = await User.findOne({email:email});

        if(!user || !(await user.matchPassword(password))){
            return res.status(400).json({message:"Your email or password is not correct"});
        }
        
        res.status(200).json({
            message: "User logged in successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    } catch (err) {
        res.status(500).json({message:"Server error",err});
    }
};

module.exports = { signupController, loginController };
