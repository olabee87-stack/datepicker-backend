module.exports.loginUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json("/event");
  } else {
    //Go to the next param if function not fullfilled
    next();
  }
};

//Redirects a user that has not logged in
module.exports.nonLoginUser = (req, res, next) => {
  if (req.isUnauthenticated()) {
    res.status(401).json("/login");
  } else {
    next();
  }
};
