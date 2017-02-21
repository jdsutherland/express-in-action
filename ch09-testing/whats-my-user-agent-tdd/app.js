const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

const viewsPath = path.join(__dirname, 'views');
app.set('view engine', 'ejs');
app.set('viewsPath', viewsPath);

app.get('/', function(req, res){
  const userAgent = req.get("user-agent") || "none";

  if (req.accepts('html')) {
    res.render('index', { userAgent });
  } else {
    res.type('text');
    res.send(userAgent);
  }
});

const server = app.listen(app.get('port'), function() {
  console.log("Express server listening on port" + "server.address().port");
});

module.exports = app;
