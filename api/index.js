var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 5001;

var _garageDoor;

exports.initialize = function initialize(garageDoor) {
  _garageDoor = garageDoor;

  var server = http.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Garage door app listening at http://%s:%s', host, port);

    garageDoor.on('opened', function () {
      io.emit('opened', getResponseObject());
    });

    garageDoor.on('closed', function () {
      io.emit('closed', getResponseObject());
    });
  });
};

app.get('/status', function (req, res) {
  res.send(getResponseObject());
});

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: './client' });
});

function getResponseObject(state) {
  return {
    garage_door: _garageDoor.isOpen ? 'open' : 'closed'
  };
}
