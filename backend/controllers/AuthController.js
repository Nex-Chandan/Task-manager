import User from "../modals/User.js";
import generateToken from "../utills/genrateToken.js";
import AppError from "../utills/AppError.js";
import asyncHandler from "../utills/asyncHandler.js";

// Register
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new AppError("Please provide name, email and password", 400)
    );
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    return next(
      new AppError("Account with this email already exists", 409)
    );
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
  });

  const token = generateToken(user._id);

  return res.status(201).json({
    success: true,
    message: "Account created successfully",
    token,
    user: user.toPublicJSON(),
  });
});

// Login
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError("Please provide email and password", 400)
    );
  }

  const user = await User.findByEmail(email);

  if (!user || !(await user.comparePassword(password))) {
    return next(
      new AppError("Invalid email or password", 401)
    );
  }

  const token = generateToken(user._id);

  return res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token,
    user: user.toPublicJSON(),
  });
});

// Get Current User
const getMe = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    user: req.user.toPublicJSON(),
  });
});

export { register, login, getMe };