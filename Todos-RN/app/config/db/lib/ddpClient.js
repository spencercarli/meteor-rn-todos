let DDPClient = require("ddp-client");

let ddpClient = new DDPClient({
  // All properties optional, defaults shown
  host : "localhost",
  port : 3000,
  ssl  : false,
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : '1',  // ['1', 'pre2', 'pre1'] available
  // Use a full url instead of a set of `host`, `port` and `ssl`
  // url: 'wss://example.com/websocket'
  // socketConstructor: WebSocket // Another constructor to create new WebSockets
});

/*
 * Connect to the Meteor Server
 */
// ddpclient.connect();

let ddp = {};

ddp.initialize = () => {
  return new Promise(function(resolve, reject) {
    ddpClient.connect(function(error, wasReconnect) {
      // If autoReconnect is true, this back will be invoked each time
      // a server connection is re-established
      if (error) {
        console.log('DDP connection error!');
        reject(error);
      }

      if (wasReconnect) {
        console.log('Reestablishment of a connection.');
      }

      console.log('connected!');
      resolve(true);
    });
  });
};

module.exports = ddp;
