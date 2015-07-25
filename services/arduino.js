var SerialPort = require('serialport').SerialPort;
var arduinoPort = new SerialPort('/dev/cu.usbserial-A6004oyH', {
  baudrate: 19200
});

exports.startListening = function startListening(eventEmitter, callback) {
  arduinoPort.on('open', function() {
    console.log('Serial Port open');

    arduinoPort.on('close', function() {
      console.log('Serial Port closed');
    });

    arduinoPort.on('data', function(data) {
      if (data[0] === 1) {
        console.log('Garage door is closed')
        eventEmitter.emit('closed');
      } else if (data[0] === 0) {
        console.log('Garage door is open')
        eventEmitter.emit('opened');
      }
    });

    callback(null);
  });
};
