module.exports = (req, res, next) => {
  const { session } = req;

  if (!session.user) return res.status(401).json('No User session found.');

  next();
};
