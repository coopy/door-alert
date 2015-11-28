'use strict';

var API = require('./api');
var GarageDoor = require('./objects/garage-door');

var garageDoor = GarageDoor.initialize(true);
API.initialize(garageDoor);
