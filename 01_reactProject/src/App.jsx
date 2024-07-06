import { useState } from 'react'

function App() {
// The react hook useState takes a default value and i returns an array containing the counter variable initalized with the
// default value and a method setCounter. As the button is clicked and the counter needs to be updated we can
// do it by updating it inside the setCounter method. 
const [counter,setCounter]=useState(15)
const addValue=function(){
setCounter(counter+1)
}

const removeVal=function(){
  setCounter(counter-1)
  }
  
return(
  <>
    <h1>React course with hitesh sir {counter} </h1>
    <h2>counter value: {counter}</h2>
    <button onClick={addValue}>
    Add Value
    </button>
    <button onClick={removeVal}>
    remove value</button>
    <p>footer:{counter}</p>
  </>
)
}

export default App
