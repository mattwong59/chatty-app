// server.js
const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const PORT = 3001;
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
// Create the WebSockets server
const wss = new SocketServer({ server });



wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  })
}

const broadcastUserCount = () => {
  wss.broadcast (JSON.stringify({
    type: 'incomingUserCount',
    numUsers: wss.clients.size
  }));
}

wss.on('connection', (ws) => {

function getRandomColour() {
  let newColor = '';
  let colors = ['#feca57', '#00d2d3', '#ff9ff3', '#ff6b6b', '#48dbfb', '#32ff7e', '#cd84f1'];
    for (let i = 0; i < colors.length; i++) {
      newColor = colors[Math.floor(Math.random() * colors.length)];
  }
  return newColor;
}

  const colorObject = {
    type: 'incomingUserColor',
    color: getRandomColour()
  }

  ws.send(JSON.stringify(colorObject));

  broadcastUserCount();

  ws.onmessage = (msg) => {
    const uid = uuidv4();
    const text = JSON.parse(msg.data);
    const parsedType = text.type;
    const newMsg = JSON.stringify({
      type: parsedType === "postMessage" ? "incomingMessage" : "incomingNotification",
      id: uid,
      username: text.username,
      content: text.content,
      color: text.color,
      image: text.image
    });
    console.log('newMsg', newMsg)

      wss.clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(newMsg);
        }
      });
  }

  ws.on('close', () => {
    console.log('Client disconnected');
    broadcastUserCount();
    });

});