import User from "../models/user.model";

export const getUsers = async (req, res, next) => {
  try {
    const users = User.findOne();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error.message);
  }
};
