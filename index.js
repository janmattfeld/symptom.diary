const awsIot = require('aws-iot-device-sdk');
const express = require('express');
const io = require('socket.io')();

/**
 * Connect to AWS IoT
 */
const device = awsIot.device({
  keyPath: './cert/880aaa0fce-private.pem.key',
  certPath: './cert/880aaa0fce-certificate.pem.crt',
  caPath: './cert/CA.pem',
  clientId: 'symptomdiary',
  region: 'us-east-1'
});

device
  .on('connect', function () {
    console.log('Connected to AWS IoT');
    device.subscribe('iotbutton/+');
  });

/**
 * Serve Dashboard and Modules
 */
const app = express();
app.use(express.static('dash'));
app.use('/node_modules', express.static('./node_modules'))
app.listen(8080);

/**
 * Start WebSocket on Port 3000 and forward IoT Messages
 */
io.on('connection', function (socket) {

  // AWS device
  device
    .on('message', function (topic, payload) {
      console.log('message', topic, payload.toString());
      socket.emit('event', payload.toString());
    });

  // Other devices
  socket.on('event', function (data) {
      console.log('message', data.toString());
      socket.emit('event', data);
  });

});
io.listen(3000);