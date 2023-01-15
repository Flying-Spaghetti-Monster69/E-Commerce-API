const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
const { createJWT, isTokenValid } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const user = await User.create({ email, name, password });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = createJWT({ payload: tokenUser });

  res.status(StatusCodes.CREATED).json({
    user: tokenUser,
    token,
  });
};

const login = async (req, res) => {
  res.send("login route");
};

const logout = async (req, res) => {
  res.send("logout route");
};

module.exports = {
  login,
  logout,
  register,
};
