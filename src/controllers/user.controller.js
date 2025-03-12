import User from "../models/user.model";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error.message);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const users = await User.findOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error.message);
  }
};
