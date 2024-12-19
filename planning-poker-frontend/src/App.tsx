import { useState } from 'react'

const fetchData = async () => {
  const response = await fetch("http://localhost:3000/");
  const json_response = await response.json();
  return json_response;
};

const ws = new WebSocket("ws://localhost:8080");

let receiveCallback = (_ : any) => {}

ws.addEventListener('open', function (event) {
    ws.send('Hello Server!');
});

ws.addEventListener('message', async function (event) {
  receiveCallback(JSON.parse(event.data).data);
});

function sendThroughWS(value : number) {
  ws.send(""+value)
}

async function sendThroughFechCall() {
  const response = await fetchData()
  receiveCallback(response.data)
}

function App() {
  const [value, setValue] = useState(0)
  receiveCallback = setValue

  return (
    <>
      <h1>Planning Poker</h1>
      <p className="read-the-docs">
        From server: {value}
      </p>
      <button onClick={() => sendThroughWS(value)}>
        Send through websocket!
      </button>
      <button onClick={() => sendThroughFechCall()}>
        Send through fetch call!
      </button>
    </>
  )
}

export default App
