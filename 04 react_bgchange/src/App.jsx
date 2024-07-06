import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setColor] = useState('grey')

// const changeColor=function(color){
// setColor(color);
// }
let randomColor=function(){
  let hex='0123456789ABCDEF'
  let color='#'
  for(let i=0;i<6;i++){
  color+=hex[Math.floor( Math.random()* 16)]
  }
  return color;
  }

const handleColor=()=>{
setColor(randomColor);
}
  return (
  <div className='w-full h-screen duration-200 ' style={{backgroundColor: color}}>
    <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
    <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
    <button onClick={handleColor}
    className="outline-none px-4 py-1  rounded-full text-black shadow-lg">Red</button>
    <button onClick={handleColor}
    className="outline-none px-4 py-1  rounded-full text-black shadow-lg">Green</button>
    </div>
  </div>
  </div>
  )
}

export default App
