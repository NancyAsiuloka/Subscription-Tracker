import User from "../models/user.model";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Users fetched Successfuly",
      success: true,
      data: users,
    });
  } catch (error) {
    next(error.message);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "User fetched Successfuly",
      success: true,
      data: user,
    });
  } catch (error) {
    next(error.message);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });

    res.status(201).json({
      message: "User created Successfuly",
      sucess: true,
      data: user,
    });
  } catch (error) {
    next(error.message);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!user) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "User updated successfuly",
      success: true,
      data: user,
    });
  } catch (error) {
    next(error.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "User deleted successfuly",
      data: null,
    });
  } catch (error) {
    next(error.message);
  }
};
