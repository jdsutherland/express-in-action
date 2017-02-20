const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.send('hello');
});

const server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

