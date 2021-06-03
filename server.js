var express = require('express');
var app = express();


const dns = require('dns');

dns.lookup('google.com', (err, address, family) => {
  console.log('Testing it: address: %j family: IPv%s', address, family);
});


// Enable HTML template middleware
app.engine('html', require('ejs').renderFile);

// Enable static CSS styles
app.use(express.static('styles'));

// reply to request with "Hello World!"
app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/dnslookup/:name', function (req, res) {

  dns.lookup(req.params.name, (err, address, family) => {
    console.log('address: %j family: IPv%s', address, family);
    res.json({ ip: address, type: family });
  });
});



//start a server on port 80 and log its start to our console
var server = app.listen(80, function () {

  var port = server.address().port;
  console.log('Example app listening on port ', port);

});
