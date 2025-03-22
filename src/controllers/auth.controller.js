import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession(); // is a session of a mongoose transaction
  session.startTransaction(); // start a transaction

  try {
    // Logic to create a new user
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.statusCode = 409;
      throw error;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashPassword }],
      { session }
    );

    await session.commitTransaction(); // commit the transaction
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created",
      data: {
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction(); // abort the transaction
    session.endSession(); // end the session
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User logged in",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res) => {};
export const forgotPassword = async (req, res) => {};
export const updatePassword = async (req, res) => {};
