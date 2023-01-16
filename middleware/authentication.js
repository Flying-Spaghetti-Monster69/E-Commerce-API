const customErrors = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new customErrors.UnauthenticatedError("authentication invalid");
  }

  try {
    const payload = isTokenValid({ token });
    req.user = { name: payload.name, userId: payload._id, role: payload.role };
  } catch (error) {
    throw new customErrors.UnauthenticatedError("authentication invalid");
  }

  next();
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new customErrors.UnauthorizedError(
        "you are not authorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
