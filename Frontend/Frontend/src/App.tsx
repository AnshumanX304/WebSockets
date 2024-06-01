import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    
    newSocket.onopen = () => {
      console.log('Connection established');
      // newSocket.send('Hello Server!');
    }

    newSocket.onmessage = (event) => {
      console.log('Message received:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    }

    setSocket(newSocket);

    return () => newSocket.close();
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }
  if(!socket){
    return <div>Loading</div>
  }

  return (
    <>
      <label>Enter the data :</label>
      <input onChange={handleInputChange} value={inputValue}></input>
      <button onClick={()=>{
        socket.send(inputValue)
      }}>Send</button>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </>
  )
}

export default App;
