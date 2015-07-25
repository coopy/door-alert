var EventEmitter = require('events').EventEmitter;
var util = require('util');
var ArduinoService = require('../services/arduino');
var TwilioService = require('../services/twilio');

var GarageDoor = function GarageDoor() {
  this.isOpen = undefined;
};

util.inherits(GarageDoor, EventEmitter);

var instance;

GarageDoor.initialize = function initialize(sendMessage) {
  if (instance) {
    throw new Error('Already initialized');
  }

  instance = new GarageDoor();
  instance.on('opened', function () {
    instance.isOpen = true;
    if (sendMessage) {
      TwilioService.sendMessage('Garage door is open', function (err) {
        if (err) {
          console.error(err);
        }
      });
    }
  });

  instance.on('closed', function () {
    instance.isOpen = false;
    if (sendMessage) {
      TwilioService.sendMessage('Garage door is closed', function (err) {
        if (err) {
          console.error(err);
        }
      });
    }
  });

  ArduinoService.startListening(instance, function(err) {
    if (err) {
      console.error(err);
      throw err;
    }
  });

  return instance;
};

GarageDoor.getInstance = function getInstance() {
  return instance;
};

module.exports = GarageDoor;
