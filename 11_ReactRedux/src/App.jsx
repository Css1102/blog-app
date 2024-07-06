import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="text-3xl rounded-lg px-4 py-2 mx auto text-color-black flex align-center justify-center">Let's Lean About Redux toolkit</h1>
    <AddTodo/>
    <Todos/>
    </>
  )
}

export default App
