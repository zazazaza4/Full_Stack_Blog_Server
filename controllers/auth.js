import User from '../models/User.js';
import bcrypt from 'bcrypt';

//Register user
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isUser = await User.findOne({ username });

    if (isUser) {
      return res.json({
        message: 'User already exists',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new UserShema({
      username,
      email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json({ newUser, message: 'success' });
  } catch (error) {
    res.status(500).json(error);
  }
};
