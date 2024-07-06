import React from 'react'
import {useParams} from 'react-router-dom'
// The useParams hook provides us with the unique id in the url which we want to display in our web page

function User() {
  // while destructuring the hook we extract the same id which was specified in the route in main.jsx file
    const {userid}=useParams()
return (
   <div className="bg-orange-500 text-black text-3xl text-center py-5 ">User:{userid}</div>

  )
}

export default User