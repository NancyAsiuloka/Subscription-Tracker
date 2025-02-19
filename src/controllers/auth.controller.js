import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession(); // is a session of a mongoose transaction
  session.startTransaction(); // start a transaction

  try {
    // Logic to create a new user
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({email})

    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.statusCode = 409;
      throw error;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create([{name, email, password: hashPassword}], { session });


    await session.commitTransaction(); // commit the transaction
  } catch (error) {
    await session.abortTransaction(); // abort the transaction
    session.endSession(); // end the session
    next(error);
  }
};
