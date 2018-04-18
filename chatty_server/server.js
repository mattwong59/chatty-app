// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // ws.onmessage = (msg) => {
  //   let message = JSON.parse(msg.data)
  //   ws.send(`User ${message.username} 'said' ${message.content}`);
  //   console.log(`User ${message.username} 'said' ${message.content}`);
  // }
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

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});