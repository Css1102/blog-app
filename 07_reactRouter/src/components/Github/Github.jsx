import React from 'react'
import {useState,useEffect} from 'react'
import  {useLoaderData}  from 'react-router-dom'
export default function Github() {
    // const[data,setData]=useState([])
    // useEffect(()=>{
    // fetch('https://api.github.com/users/hiteshchoudhary')
    // .then((response)=>response.json())
    // .then((data)=>setData(data))
    // },[])
    // Notes:More optimized method to fetch the details is written below.
const data=useLoaderData()
  return (
<div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">Github:{data.followers}
<img src={data.avatar_url} width={300} alt="" />
</div>
)
}

// More optimized way to load the information on the github page by preprocessing the data as soon as
// user howers on the component.The data brought from the api will be stored in cache memory.
export const GithubInfoLoad=async()=>{
const response=await fetch('https://api.github.com/users/hiteshchoudhary')
return response.json()
}
