const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  displayName: String,
  bio: String,
});

const noop = () => {};

userSchema.pre('save', function(done) {
  const user = this;
  if (!user.isModified('password')) { return done(); }

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) { return done(err); }
    bcrypt.hash(user.password, salt, noop, (err1, hashedPassword) => {
      if (err1) { return done(err1); }
      user.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.checkPassword = function checkPassword(guess, done) {
  bcrypt.compare(guess, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

userSchema.methods.name = function name() {
  return this.displayName || this.username;
};

module.exports = mongoose.model('User', userSchema);
