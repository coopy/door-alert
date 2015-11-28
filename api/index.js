'use strict';

var config = require('config');
var express = require('express');
var app = express();
var http = require('http').Server(app); // eslint-disable-line new-cap
var io = require('socket.io')(http);

var _garageDoor;

function getResponseObject() {
  return {
    garageDoor: {
      isOpen: _garageDoor.isOpen
    }
  };
}

exports.initialize = function initialize(garageDoor) {
  _garageDoor = garageDoor;

  var port = config.get('server.port');
  var server = http.listen(port, function () {
    var host = server.address().address;

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
