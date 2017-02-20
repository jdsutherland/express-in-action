const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/random/:min/:max', function(req, res){
  const min = parseInt(req.params.min);
  const max = parseInt(req.params.max);

  if (isNaN(min) || isNaN(max)) {
    res.status(400);
    res.json({ error: 'Bad request.' });
    return;
  }

  const result = Math.round((Math.random() * (max - min) + min));

  res.json({ result });
});

const server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

