import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json({ newUser, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message:
          ' The username and/or password that you have entered is incorrect.',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message:
          ' The username and/or password that you have entered is incorrect.',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    );

    res.json({
      token,
      user,
      message: 'success',
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
