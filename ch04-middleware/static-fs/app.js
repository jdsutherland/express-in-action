const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
  console.log(`Request IP: ${req.url}`);
  console.log(`Request date: ${new Date()}`);
  next();
});

app.use(function(req, res, next) {
  const filePath = path.join(__dirname, 'static', req.url);
  fs.stat(filePath, function(err, fileInfo) {
    if (err) {
      next();
      return;
    }

    if (fileInfo.isFile()) {
      res.sendFile(filePath);
    } else {
      next();
    }
  });
});

app.use(function(req, res) {
  res.status(404);
  res.send('File not found!');
});

const server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + server.address().port);
});

