const express = require('express');
const hasBodyProps = require('../middleware/hasBodyProps');
const hasUserSession = require('../middleware/hasUserSession');
const { Category } = require('../models');

const router = express.Router();

const getAll = async (_, res) => {
  // find all categories
  const categories = await Category.findAll();

  res.status(200).json(categories);
};

const createCategory = async (req, res) => {
  const { body } = req;
  const { title, description } = body;
  
  // create category
  try {
    const category = await Category.create({ title, description });
    res.status(200).json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

const deleteCategory = async (req, res) => {
  const { params } = req;
  const { id: categoryId } = params;

  try {
    // find category
    const category = await Category.findByPk(categoryId);

    // if category doesn't exist
    if (!category) throw new Error('Category does not exist.');

    // remove all associations
    await Promise.all([
      category.setGroups([]), // remove all event associations
      category.setEvents([]), // remove all event associations
    ]);

    // delete category
    const result = await category.destroy();

    res.status(200).json(result);
  } catch (err) {
    const { message } = err;
    console.error(message);
    res.status(500).json(message);
  }
};

router.get('/', getAll);
router.post('/', hasUserSession, hasBodyProps('title'), createCategory);
router.delete('/:id', hasUserSession, deleteCategory);

module.exports = router;
