import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch the API route from backend
    const fetchAPI = async () => {

      const response = await fetch('http://localhost:5555')
      const result = await response.json();
      setMessage(result)
      console.log(result)
    }

    fetchAPI();
  }, []);



  return (
    <div className="App">
      <h1>Frontend and Backend Connected</h1>
      <p>Message from backend:{message && message.data.map((todo) => {
        return <span key={todo._id}>{todo.title}</span>
      })} </p>
    </div>
  );
}

export default App;
