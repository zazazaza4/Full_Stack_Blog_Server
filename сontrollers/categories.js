import Category from '../models/Category.js';

// Create Category
export const createCategory = async (req, res) => {
  try {
    const newCategory = await Category(req.body);
    const savedCategory = await newCategory.save();

    return res.status(200).json(savedCategory);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Get All Categories
export const getAll = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res.json({ message: 'There are no categories ' });
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};
