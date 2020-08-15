const express = require('express');
const hasBodyProps = require('../../middleware/hasBodyProps');
const hasUserSession = require('../../middleware/hasUserSession');

const router = express.Router();

const handleGetAllEvents = require('./api/handleGetAllEvents');

router.get('/', handleGetAllEvents);

// router.post('/:eventId/group/:groupId', hasUserSession, assignEventToGroup);
// router.post('/:eventId/category/:categoryId', hasUserSession, addCategoryToEvent);
// router.delete('/:eventId/category/:categoryId', hasUserSession, removeCategoryFromEvent);

module.exports = router;
