'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var ArduinoService = require('../services/arduino');
var TwilioService = require('../services/twilio');

var log = require('../services/log').child({ object: 'Garage Door' });

var GarageDoor = function GarageDoor() {
  this.isOpen = undefined;
};

util.inherits(GarageDoor, EventEmitter);

var instance;

GarageDoor.initialize = function initialize(sendMessage) {
  if (instance) {
    return log.error('Can\'t initialize – already initialized');
  }

  instance = new GarageDoor();
  instance.on('opened', function () {
    instance.isOpen = true;
    if (sendMessage) {
      TwilioService.sendMessage('Garage door is open', function (err) {
        if (err) {
          log.error(err, 'Error calling TwilioService.sendMessage (opened)');
        }
      });
    }
  });

  instance.on('closed', function () {
    instance.isOpen = false;
    if (sendMessage) {
      TwilioService.sendMessage('Garage door is closed', function (err) {
        if (err) {
          log.error(err, 'Error calling TwilioService.sendMessage (closed)');
        }
      });
    }
  });

  ArduinoService.startListening(instance, function(err) {
    if (err) {
      log.error(err, 'Error calling ArduinoService.startListening');
      // TODO Catch error on top level and keep retrying
      throw err;
    }
  });

  return instance;
};

GarageDoor.getInstance = function getInstance() {
  return instance;
};

module.exports = GarageDoor;
