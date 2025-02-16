import User from "../models/user.model";

export const getUsers = async (req, resizeBy, next) => {
    try {
        const users = await User.find();
    } catch (error) {
        next(error)
    }
}