import React from 'react'
import UserContext from '../context/UserContext'
import {useContext} from 'react'

function Profile() {
    // We can access the data from the context API using the useContext hook. It will return an object
    // and we can accordingly extract values from it.
   const {user}=useContext(userContext)
  return (
    <div>Profile:{user.username}</div>
  )
}

export default Profile