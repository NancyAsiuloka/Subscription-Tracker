import mongoose from "mongoose";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession(); // is a session of a mongoose transaction
  session.startTransaction(); // start a transaction

  try {
    // Logic to create a new user

    await session.commitTransaction(); // commit the transaction
  } catch (error) {
    await session.abortTransaction(); // abort the transaction
    session.endSession(); // end the session
    next(error);
  }
};
