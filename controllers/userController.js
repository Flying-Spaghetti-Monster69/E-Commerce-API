const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ users, nHits: users.length });
};
const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    throw new customError.NotFoundError("user not found");
  }
  res.status(StatusCodes.OK).json({ user });
};
const showCurrentUser = async (req, res) => {
  res.send("show current user route");
};
const updateUser = async (req, res) => {
  res.send("update user route");
};
const updateUserPassword = async (req, res) => {
  res.send("update user password route");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
