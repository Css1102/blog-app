import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[length,setlength]=useState(8)
  const[charAllowed,setCharallowed]=useState(false)
  const[numAllowed,setnumallowed]=useState(false)
  const[password,setPassword]=useState('')
  // useCallback is an inbuilt react hook which optimizes the performance of our page by avoiding re-
  // rendering of the function. It uses the technique of memoization. it takes a callback fn and a 
  // dependency array as input. After every render it checks the val of curr dependency with the prev
  // one. if no change then react will render the fn passed in the prev render else it will render the
  // current fn.
  const generatePass=useCallback(()=>{
  let pass=""
  let str_1=
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let str_2=str_1.toLowerCase()
  let str=str_1.concat(str_2)
  if(numAllowed){
  str+="0123456789";
  }
  if(charAllowed){
    str+="!@#$%^&*()_+";
  }
  for(let i=1;i<length;i++){
  const index=Math.floor(Math.random()*str.length+1);
  pass+=str.charAt(index)
  }
   setPassword(pass)
  },[length,numAllowed,charAllowed])
// it re-runs the function as soon as there is any change detected in the dependencies. 
  useEffect(()=>{
    generatePass();
  },[length,numAllowed,charAllowed])
  // the useref hook gives the user feedback about an action by dhttps://reactrouter.com/en/main/guides/api-development-strategy#goalsisplaying the change in the form of
  // any activity like no of times loading,selecting text etc.
  let passwordRef=useRef(null);
// this function copies the password from the clipboard as the copy btn is clicked and selects the 
// password after copying .
  const copyPass=function(){
  window.navigator.clipboard.writeText(password)
  passwordRef.current?.select();
  }
  return (
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
   <h1 className=" text-white text-center my-3">Password generator</h1>
   <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input type="text" 
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      // onChange={()=>{generatePass}}
      // readOnly
      ref={passwordRef}
    />
    <button onClick={copyPass}
    className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
    copy
    </button>

   </div>
    <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input type="range" 
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=> setlength(e.target.value)}
        name=""
         id="" 
         />
         <label htmlFor="length" className="htmlFor">Lengthy:{length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input type="checkbox"
      defaultChecked={numAllowed}
      onChange={()=>{
        setnumallowed((prev)=>!prev)
      }}
       name="" 
       id="" />
       <label htmlFor="number" >Number</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input type="checkbox"
      defaultChecked={charAllowed}
      onChange={()=>{
        setCharallowed((prev)=>!prev)
      }}
       name="" 
       id="" />
       <label htmlFor="character" >Characters</label>
      </div>

    </div>
   </div>
  )
}

export default App
