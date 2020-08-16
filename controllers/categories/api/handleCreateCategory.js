const { createSingleCategory } = require('../functions/createCategories');

const handleCreateCategory = async (req, res) => {
  const { body } = req;

  try {
    const category = await createSingleCategory(body);
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleCreateCategory;
