import User from "../models/user.model";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: "Fetched succesfully",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};
