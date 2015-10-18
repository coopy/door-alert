var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: 'garage-door',
  streams: [
    {
      stream: process.stderr,
      level: 'debug'
    },
    {
      stream: process.stderr,
      level: 'error',
      path: '/var/log/house/garage-door/error.log'
    },
    {
      stream: process.stdout,
      level: 'info',
      path: '/var/log/house/garage-door/stdout.log'
    }
  ]
});

module.exports = log;