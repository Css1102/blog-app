import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Card'

function App() {
  const [count, setCount] = useState(0)
let newObject={
  age:15,
  name:"ruhaan",
  height:165,
  attendance:[0,0,1,1,0],
};

  return (
    <>
    <h1 className='text-3xl bg-green-500 p-3 rounded-md'>Vite with Tailwind</h1>
    <Card username='arpit balabantaray' alsoPass={newObject}/>
    </>
  )
}

export default App
