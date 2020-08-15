const express = require('express');
const hasBodyProps = require('../../middleware/hasBodyProps');
const hasUserSession = require('../../middleware/hasUserSession');

const handleGetAllGroups = require('./api/handleGetAllGroups');
const handleCreateGroup = require('./api/handleCreateGroup');
const handleRemoveGroup = require('./api/handleRemoveGroup');
const handleCreateGroupEvent = require('./api/handleCreateGroupEvent');
const handleRemoveGroupEvent = require('./api/handleRemoveGroupEvent');
const { handleAddGroupCategory, handleRemoveGroupCategory } = require('./api/handleUpdateGroupCategory');
const handleUpdateUserGroup = require('./api/handleUpdateUserGroup');

const router = express.Router();

router.get('/', handleGetAllGroups);
router.post('/', hasUserSession, hasBodyProps('title'), handleCreateGroup);
router.delete('/:groupId', hasUserSession, handleRemoveGroup);

router.post('/:groupId/events', hasUserSession, handleCreateGroupEvent);
router.delete('/:groupId/events/:eventId', hasUserSession, handleRemoveGroupEvent);

router.post('/:groupId/category/:categoryId', hasUserSession, handleAddGroupCategory);
router.delete('/:groupId/category/:categoryId', hasUserSession, handleRemoveGroupCategory);

router.put('/:groupId/user/:userId', hasUserSession, handleUpdateUserGroup);

module.exports = router;
