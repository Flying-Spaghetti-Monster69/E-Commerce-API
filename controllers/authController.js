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
  const { email, password } = req.body;

  if (!email || !password) {
    throw new customError.BadRequestError("please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new customError.UnauthenticatedError("invalid login");
  }

  const passwordVerifier = await user.comparePasswords(password);

  if (!passwordVerifier) {
    throw new customError.UnauthenticatedError("invalid credentials");
  }

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ user: tokenUser, res: res });
  res.status(StatusCodes.OK).json({
    user: tokenUser,
  });
};

const logout = async (req, res) => {
  res.cookie("token", "Goodbye :)", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logout" });
};
module.exports = {
  login,
  logout,
  register,
};
