const express = require('express');
const hasBodyProps = require('../../middleware/hasBodyProps');
const hasUserSession = require('../../middleware/hasUserSession');

const getAll = require('./getAll');
const createGroup = require('./createGroup');
const deleteGroup = require('./deleteGroup');
const joinGroup = require('./joinGroup');
const leaveGroup = require('./leaveGroup');
const addCategoryToGroup = require('./addCategoryToGroup');
const removeCategoryFromGroup = require('./removeCategoryFromGroup');

const router = express.Router();

router.get('/', getAll);
router.post('/', hasUserSession, hasBodyProps('title'), createGroup);
router.delete('/:id', hasUserSession, deleteGroup);
router.post('/:id/join', hasUserSession, joinGroup);
router.post('/:id/leave', hasUserSession, leaveGroup);
router.post('/:groupId/category/:categoryId', hasUserSession, addCategoryToGroup);
router.delete('/:groupId/category/:categoryId', hasUserSession, removeCategoryFromGroup);

module.exports = router;
