const express = require('express');
const hasBodyProps = require('../../middleware/hasBodyProps');
const hasAdminSession = require('../../middleware/hasAdminSession');

const router = express.Router();

const handleGetAllCategories = require('./api/handleGetAllCategories');
const handleCreateCategory = require('./api/handleCreateCategory');
const handleUpdateCategory = require('./api/handleUpdateCategory');
const handleRemoveCategory = require('./api/handleRemoveCategory');

router.get('/', handleGetAllCategories);
router.post('/', hasAdminSession, hasBodyProps('title'), handleCreateCategory);

router.put('/:categoryId', hasAdminSession, handleUpdateCategory);
router.delete('/:categoryId', hasAdminSession, handleRemoveCategory);

module.exports = router;
