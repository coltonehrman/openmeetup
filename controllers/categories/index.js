const express = require('express');
const hasBodyProps = require('../../middleware/hasBodyProps');
const hasUserSession = require('../../middleware/hasUserSession');

const router = express.Router();

const handleGetAllCategories = require('./api/handleGetAllCategories');
const handleCreateCategory = require('./api/handleCreateCategory');
const handleUpdateCategory = require('./api/handleUpdateCategory');
const handleRemoveCategory = require('./api/handleRemoveCategory');

router.get('/', handleGetAllCategories);
router.post('/', hasUserSession, hasBodyProps('title'), handleCreateCategory);

router.put('/:categoryId', hasUserSession, handleUpdateCategory);
router.delete('/:categoryId', hasUserSession, handleRemoveCategory);

module.exports = router;
