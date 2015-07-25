var express = require('express');
var app = express();
var _garageDoor;

exports.initialize = function initialize(garageDoor) {
  _garageDoor = garageDoor;

  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Garage door app listening at http://%s:%s', host, port);
  });
};

app.get('/status', function (req, res) {
  var responseObj = {
    garage_door: _garageDoor.isOpen ? 'open' : 'closed'
  };
  res.send(responseObj);
});
