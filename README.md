Door Alert
==========

Get a text message notification when a door opens.

### Setup

Add a `.secrets.json` file with the following properties to the project root:
```
{
  "twilio": {
    "id": "your twilio SID",
    "secret": "your twilio secret key",
    "phone_number": "your twilio phone number"
  },
  "alert_targets": {
    "phone_number": "the phone number that will receive text alerts"
  }
}

```

### Run the service

```
npm install
npm start
```

