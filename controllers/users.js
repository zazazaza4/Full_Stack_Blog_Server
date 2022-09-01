import bcrypt from 'bcrypt';
import User from '../models/User.js';

//Update
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete
export const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};
