const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
} = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const user = await User.create({ email, name, password });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ user: tokenUser, res: res });
  res.status(StatusCodes.CREATED).json({
    user: tokenUser,
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
