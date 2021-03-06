'use strict';

var secrets = require('../.secrets.json');
var twilioConfig = secrets.twilio;
var client = require('twilio')(twilioConfig.id, twilioConfig.secret);

exports.sendMessage = function sendMessage (msg, callback) {
  client.sendMessage({
    to: secrets.alert_targets.phone_number,
    from: twilioConfig.phone_number,
    body: msg
  }, function(err, response) {
    if (err) {
      return callback(err);
    }

    // "response" is a JavaScript object containing data received from Twilio.
    // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
    // http://www.twilio.com/docs/api/rest/sending-sms#example-1
    //   {
    //     "account_sid": "AC5ef872f6da5a21de157d80997a64bd33",
    //     "api_version": "2010-04-01",
    //     "body": "This is the message",
    //     "date_created": "Wed, 18 Aug 2010 20:01:40 +0000",
    //     "date_sent": null,
    //     "date_updated": "Wed, 18 Aug 2010 20:01:40 +0000",
    //     "direction": "outbound-api",
    //     "from": "+14158141829",
    //     "price": null,
    //     "sid": "SM90c6fc909d8504d45ecdb3a3d5b3556e",
    //     "status": "queued",
    //     "to": "+14159352345",
    //     "uri": "/2010-04-01/Accounts/AC5ef872f6da5a21de157d80997a64bd33/SMS/Messages/SM90c6fc909d8504d45ecdb3a3d5b3556e.json"
    // }

    var log = 'Sent message to ' + response.to + ': "' + response.body + '"';
    console.log(log);
    return callback(null, response);
  });
};
