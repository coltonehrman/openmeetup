module.exports = (...params) => (req, res, next) => {
  const missing = [];

  for (let param of params) {
    if (!req.body.hasOwnProperty(param)) {
      missing.push(`"${param}"`);
    }
  }

  if (missing.length > 0) {
    const error = `Request Body is missing ${missing.join(', ')}.`;
    console.error(error);
    return res.status(500).json(error);
  }

  next();
};
