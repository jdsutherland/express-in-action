const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('short'));

const staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

app.use(function(req, res) {
  res.status(404);
  res.send('File not found!');
});

const server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + server.address().port);
});

