import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Protected({children,authentication=true}) {
const authStatus=useSelector((state)=>(state.status))
const navigate=useNavigate()
const[loader,setLoader]=useState(true)
useEffect(()=>{
if(authentication && authStatus!==authentication){
navigate('/Login');
}
else if(!authentication && authStatus!==authentication){
navigate('/')
}
setLoader(false)
},[authentication,authStatus,navigate])
  return (
    loader? null:<>{children}</>
  )
}
export default Protected