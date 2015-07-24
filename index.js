var SerialPort = require('serialport').SerialPort;
var arduinoPort = new SerialPort('/dev/cu.usbserial-A6004oyH');

arduinoPort.on('open', function() {
  console.log('Serial Port open');
  arduinoPort.on('data', function(data) {
      console.log('data received: ' + data[0]);
  });
});

arduinoPort.on('close', function() {
  console.log('Serial Port closed');
});