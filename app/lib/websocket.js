const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(8888, function() {
  console.log((new Date()) + ' Server is listening on port 8888');
});

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

module.exports = app => {
  const ctx = app.createAnonymousContext();
  const wsService = ctx.service.websocket;
  return new Promise(resolve => {
    wsServer.on('request', function(request) {
      const connection = request.accept('jerry-demo', request.origin);
      console.log((new Date()) + ' Connection accepted.');
      connection.on('message', function(message) {
        if (message.type === 'utf8') {
          console.log('Received Message: ' + message.utf8Data);
          // connection.sendUTF(message.utf8Data);
          wsService.parseMessage(JSON.parse(message.utf8Data));
        } else if (message.type === 'binary') {
          console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
          // connection.sendBytes(message.binaryData);
        }
      });
      connection.on('close', function() {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
      });

      resolve(connection);

      wsService.sendNumber();
    });
  });
};
