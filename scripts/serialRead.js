var SerialPort = require("serialport")
var serialPort = new SerialPort("COM7", {
    baudRate: 9600
})

serialPort.on("open", function () {
    console.log('Communication is on!')

    serialPort.on('data', function(data) {
      console.log('data received: ' + data)
    })
  })