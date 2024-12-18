import { useState, useEffect } from 'react'

const fetchData = async () => {
  const response = await fetch("https://meowfacts.herokuapp.com/");
  const data = await response.json();
  return data;
};

function App() {
  const [values, setValues] = useState([])

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setValues(data.data);
    })();
  }, []);

  return (
    <>
      <h1>Planning Poker</h1>
      <p className="read-the-docs">
        {values.length > 0 ? values[0] : ""}
      </p>
    </>
  )
}

export default App
