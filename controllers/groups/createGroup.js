const { Group } = require('../../models');

const createGroup = async (req, res) => {
  const { body, session } = req;
  const { title, description, location } = body;
  const { user: { id: userId } } = session;
  let lat, long;

  if (title.toString().trim() === '') {
    return res.status(500).json('Group must have a title.');
  }

  if (typeof location === 'object' && location.long && location.lat) {
    long = location.long;
    lat = location.lat;
  }

  if (Array.isArray(location) && location.length === 2) {
    long = location[0];
    lat = location[1];
  }

  if (
    (Number.isNaN(parseFloat(long)) || Number.isNaN(parseFloat(lat))) ||
    (long.toString().trim() === '' || lat.toString().trim() === '')
  ) {
    long = null;
    lat = null;
  }

  // create PostGID Geography Point data type
  const locationPoint = (long && lat && (typeof long !== 'undefined' || typeof lat !== 'undefined')) ? {
    type: 'Point',
    coordinates: [long, lat],
    crs: { type: 'name', properties: { name: 'EPSG:4326'} }
  } : null;

  // create group
  const group = await Group.create({ title, description, location: locationPoint }, {
    include: ['users']
  });

  await group.addUser(userId, {
    through: {
      isMember: true,
      isOwner: true,
      isCreator: true
    }
  });

  await group.reload();
  await group.populateMe(userId);

  res.status(200).json(group);
};

module.exports = createGroup;
