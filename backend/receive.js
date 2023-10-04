var {SerialPort} = require("serialport");
var port = "/dev/tty.Bluetooth-Incoming-Port";

var serialPort = new SerialPort({path: port,
  baudRate: 9600
});

serialPort.on("open", function() {
  console.log("-- Connection opened --");
  serialPort.on("data", function(data) {
    console.log("Data received: " + data);
  });
});