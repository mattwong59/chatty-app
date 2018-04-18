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

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.onmessage = (msg) => {
    const uid = uuidv4();
    const text = JSON.parse(msg.data);
    const newMsg = JSON.stringify({id: uid, username: text.username, content: text.content});

    wss.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(newMsg);
        console.log("Message", newMsg);
      }
  });
    console.log(`User ${text.username} said ${text.content}`)
  }

  ws.on('close', () => console.log('Client disconnected'));
});