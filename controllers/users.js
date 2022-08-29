import bcrypt from 'bcrypt';

//Update
export const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = 0;
    }
    try {
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json('You can update only your account!');
  }
};

//Delete
export const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error);
  }
};
