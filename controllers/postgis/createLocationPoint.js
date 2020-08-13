const createLocationPoint = (location) => {
  let long, lat;

  if (!location) return null;

  // if location is an Array
  if (Array.isArray(location) && location.length === 2) {
    long = location[0];
    lat = location[1];
  }
  // if location is an Object
  else if (typeof location === 'object' && location.long && location.lat) {
    long = location.long;
    lat = location.lat;
  }
  // otherwise return null
  else {
    return null;
  }

  // check that long and lat are valid floats and not empty
  if (
    (!long || !lat) ||
    (long.toString().trim() === '' || lat.toString().trim() === '') ||
    (Number.isNaN(parseFloat(long)) || Number.isNaN(parseFloat(lat)))
  ) {
    return null;
  }

  // create valid PostGID Geography Point data type
  return {
    type: 'Point',
    coordinates: [long, lat],
    crs: { type: 'name', properties: { name: 'EPSG:4326'} }
  };
};

module.exports = createLocationPoint;
