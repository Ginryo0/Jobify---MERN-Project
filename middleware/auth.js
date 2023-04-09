const auth = async (req, res, next) => {
  console.log('Auth');
  next();
};

export default auth;
