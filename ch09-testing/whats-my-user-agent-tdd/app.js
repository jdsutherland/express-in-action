const express = require('express');

const app = express();

const viewsPath = path.join(__dirname, 'views');
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('viewsPath', viewsPath);

app.get('/', function(req, res){
  res.send('hello');
});

const server = app.listen(app.get('port'), function() {
  console.log("Express server listening on port" + "server.address().port");
});
