const { getAllCategories } = require('../functions/getCategories');

const handleGetAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategories({ include: 'groups' });
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleGetAllCategories;
