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

userSchema.pre('save', (done) => {
  if (!this.isModified('password')) { return done(); }

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) { return done(err); }
    bcrypt.hash(this.password, salt, noop, (err1, hashedPassword) => {
      if (err1) { return done(err1); }
      this.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.checkPassword = (guess, done) => {
  bcrypt.compare(guess, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

userSchema.methods.name = () => this.displayName || this.username;

module.exports = mongoose.model('User', userSchema);
