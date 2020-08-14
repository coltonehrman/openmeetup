module.exports = (...props) => (req, res, next) => {
  const missing = [];

  for (let prop of props) {
    if (!req.query.hasOwnProperty(prop)) {
      missing.push(`"${prop}"`);
    }
  }

  if (missing.length > 0) {
    const error = `Request Query is missing ${missing.join(', ')}.`;
    return res.status(500).json(error);
  }

  next();
};
