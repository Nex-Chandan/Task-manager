import jwt from "jsonwebtoken";
import User from "../modals/User.js";
import AppError from "../utills/AppError.js";
import asyncHandler from "../utills/asyncHandler.js";

// verifies JWT on every protected route
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No token → reject
  if (!token) {
    return next(new AppError("Access denied. No token provided.", 401));
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Attach user to request
  req.user = await User.findById(decoded.id).select("-password");

  if (!req.user) {
    return next(new AppError("User belonging to this token no longer exists.", 401));
  }

  // Optional flag (schema currently doesn't define isActive)
  if (req.user.isActive === false) {
    return next(new AppError("Your account has been deactivated.", 403));
  }

  next();
});
