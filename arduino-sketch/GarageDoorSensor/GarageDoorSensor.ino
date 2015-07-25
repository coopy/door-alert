// Garage Door Open/Closed Sensor
// ------------------------------
// The lever switch is configured such that it's closed
// (lets current through) when the door is closed.
// Since we're using the built-in PULLUP resistor,
// this state is reversed, meaning we see the pin
// go to HIGH when the switch opens.

// Only send a value when the "open state" changes.
boolean _doorIsOpen = false;

void setup() {
  //start serial connection
  Serial.begin(19200);
  //configure pin2 as an input and enable the internal pull-up resistor
  pinMode(2, INPUT_PULLUP);
  pinMode(13, OUTPUT);
  // Read initial state
  int sensorVal = digitalRead(2);
  setState(sensorVal == HIGH);
}

void loop() {
  int sensorVal = digitalRead(2);

  if (sensorVal == HIGH && !_doorIsOpen) {
    setState(true);
  }
  else if (sensorVal == LOW && _doorIsOpen) {
    setState(false);
  }

  delay(100);
}

void setState(boolean openState) {
  _doorIsOpen = openState;
  Serial.write(openState ? 1 : 0);
  digitalWrite(13, openState ? HIGH : LOW);
}



