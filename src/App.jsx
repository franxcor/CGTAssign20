import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatBotInterface from './components/ChatBotInterface'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChatBotInterface></ChatBotInterface>
    </>
  )
}

export default App
