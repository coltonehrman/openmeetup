module.exports = (req, res, next) => {
  const { session } = req;

  if (!session.user) {
    const error = 'No User session found.';
    console.error(error);
    return res.status(401).json({ error });
  }

  next();
};
