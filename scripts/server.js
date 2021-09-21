var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
      }),
    port = 8888;

//Server start
server.listen(port, () => console.log('on port' + port))

//user server
app.use(express.static(__dirname + '/public'));

io.on('connection', onConnection);

var connectedSocket = null;
function onConnection(socket){
    connectedSocket = socket;
}


const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline; 
const usbport = new SerialPort("COM7", {
    baudRate: 9600
})
const parser = usbport.pipe(new Readline()); 
parser.on('data', function (data) {
    console.log('data ',data)
    io.emit('serialdata', { data: data });
});