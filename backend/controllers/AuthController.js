import User from "../modals/User.js";
import generateToken from "../utills/genrateToken.js";
import AppError from "../utills/AppError.js";
import asyncHandler from "../utills/asyncHandler.js";

// Register
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError("Please provide name, email and password", 400));
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    return next(new AppError("Account with this email already exists", 409));
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
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: user.toPublicJSON(),
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }

  // Must include password field (schema has select:false)
  const user = await User.findByEmail(email);

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Invalid email or password", 401));
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
