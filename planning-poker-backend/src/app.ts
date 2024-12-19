import express from 'express';
import cors from 'cors';
import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });
let number_of_requests = 0;

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(JSON.stringify({ data: number_of_requests++ }));
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const app = express();
const port = 3000;
app.use(cors());

app.get('/', (req, res) => {
  console.log("called");
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ data: number_of_requests++ }));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
