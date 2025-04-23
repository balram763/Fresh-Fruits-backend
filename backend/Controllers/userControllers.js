const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//bcrypt
const salt = bcrypt.genSaltSync(10);

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("FILL ALL DETAILS");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json("USER NOT FOUND");
  }

  const token = generateToken(user.id);

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ error: "INVALID CREDENTIAL" });
  }

  res.status(200).json({
    name: user.name,
    email,
    isAdmin: user.isAdmin,
    token,
    address: user.address,
  });
});
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json("FILL ALL DETAILS");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(400).json({ message: "USER ALREADY EXIST" });
  }

  const hasspassword = bcrypt.hashSync(password, salt);

  const user = await User.create({
    name,
    email,
    password: hasspassword,
    // token : generateToken()
  });

  if (!user) {
    return res.status(400).json("Unable to Create User");
  }

  const token = generateToken(user.id);

  res.status(200).json({
    name,
    email,
    token,
  });
};

//generateToken

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};

const privateController = expressAsyncHandler(async (req, res) => {
  res.json({
    msg: "private route",
  });
});

const addressUpdate = expressAsyncHandler(async (req, res) => {
  const { address } = req.body;

  const userId = req.user._id;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { address: address },
    { new: true, runValidators: true }
  ).select("-password");

  if (!updatedUser) {
    return res.status(404).json({ message: "UNABLE TO UPDATE" });
  }

  res.status(200).json({
    message: "Address updated",
    user: updatedUser.address,
  });
});

const getAddress = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "USER NOT FOUND" });
  }

  res.status(200).json({
    address: user.address,
  });
});

module.exports = {
  login,
  register,
  privateController,
  addressUpdate,
  getAddress,
};
