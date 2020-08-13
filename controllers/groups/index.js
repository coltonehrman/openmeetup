const express = require('express');
const hasBodyProps = require('../../middleware/hasBodyProps');
const hasUserSession = require('../../middleware/hasUserSession');

const handleGetAllGroups = require('./api/handleGetAllGroups');
const handleCreateGroup = require('./api/handleCreateGroup');
const handleRemoveGroup = require('./api/handleRemoveGroup');
const handleUpdateGroupCategories = require('./api/handleUpdateGroupCategories');
const changeUserGroupStatus = require('./changeUserGroupStatus');

const router = express.Router();

router.get('/', handleGetAllGroups);
router.post('/', hasUserSession, hasBodyProps('title'), handleCreateGroup);
router.delete('/:id', hasUserSession, handleRemoveGroup);

router.put('/:groupId/categories', hasUserSession, handleUpdateGroupCategories);

router.post('/:id/member', hasUserSession, changeUserGroupStatus('isMember', true));
router.delete('/:id/member', hasUserSession, changeUserGroupStatus('isMember', false));

router.post('/:id/owner', hasUserSession, changeUserGroupStatus('isOwner', true));
router.delete('/:id/owner', hasUserSession, changeUserGroupStatus('isOwner', false));

module.exports = router;
