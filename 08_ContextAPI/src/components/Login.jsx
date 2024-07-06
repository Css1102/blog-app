import React from 'react'
import {useState,useContext} from 'react'
import UserContext from '../context/UserContext'

function Login() {
   const[username,setUsername]=useState('')
   const[password,setPassword]=useState('')
  // We can add data to the API using the setData method through the hook useContext. The data can be
  // accessed by all the components of the web page. Accessed in profile.jsx
   const {setUser}=useContext(userContext);
  
   let handleSubmit=(e)=>{
    e.preventDefault
    setUser(username,password);
   }
  return (
<div>
    <h2>Login</h2>
    <input type="text"
    value={username}
    onChange={(e)=>setUsername(e.target.value)}
    placeHolder="username" />
    {" "}
     <input type="password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    placeHolder="password" />
    <button
    onClick={handleSubmit}
    >Submit</button>
</div>
  )
}

export default Login;