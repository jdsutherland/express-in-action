const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const setupPassport = require('./setupPassport');
const routes = require('./routes');

const app = express();
mongoose.connect('mongodb://localhost:27017/test');
setupPassport();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: '8350e5a3e24c153df2275c9f80692773',
  resave: true,
  saveUninitialized: true,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + server.address().port);
});

