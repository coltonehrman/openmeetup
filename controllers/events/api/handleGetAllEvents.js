const _ = require('lodash');
const { getAllEvents } = require('../functions/getEvents');

const handleGetAllEvents = async (req, res) => {
  try {
    const events = await getAllEvents();    
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = handleGetAllEvents;
