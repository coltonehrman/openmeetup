const express = require('express');
const hasBodyProps = require('../../middleware/hasBodyProps');
const hasQueryProps = require('../../middleware/hasQueryProps');
const hasUserSession = require('../../middleware/hasUserSession');

const handleGetAllGroups = require('./api/handleGetAllGroups');
const handleCreateGroup = require('./api/handleCreateGroup');
const handleRemoveGroup = require('./api/handleRemoveGroup');
const { handleAddGroupCategory, handleRemoveGroupCategory } = require('./api/handleUpdateGroupCategory');
const handleUpdateUserGroup = require('./api/handleUpdateUserGroup');

const router = express.Router();

router.get('/', handleGetAllGroups);
router.post('/', hasUserSession, hasBodyProps('title'), handleCreateGroup);
router.delete('/:id', hasUserSession, handleRemoveGroup);

router.post('/:groupId/category/:categoryId', hasUserSession, handleAddGroupCategory);
router.delete('/:groupId/category/:categoryId', hasUserSession, handleRemoveGroupCategory);

router.put('/:groupId/user/:userId', hasUserSession, handleUpdateUserGroup);

module.exports = router;
