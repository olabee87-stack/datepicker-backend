const Eventuser = require("./api/models/user");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  //User authentication
  function authenticateUser(username, password, done) {
    Eventuser.findOne({ username: username }, (err, record) => {
      if (err) {
        return done(err);
        
      }

      if (!record) {
        return done(null, false, { message: "Incorrect username" });
        
      }

      if (record.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      
      }
     return done(null, record);
    
    });
  }

  passport.use(new LocalStrategy(authenticateUser));

  //Serializing user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //Deserialize user
  passport.deserializeUser((id, done) => {
    Eventuser.findById(id, (err, record) => {
      if (err) {
        done(err);
        
      }
      if (record) {
        done(null, record);
      }
    });
  });
};
