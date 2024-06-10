import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/Auth.js'
import {logout} from '../../store/authSlice.js'

function Logout() {
const dispatch=useDispatch()

const logoutHandler=()=>{
authService.lo
gout().then(()=>{
dispatch(logout());
})

}
  return (
   <button
   className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
   onClick={logoutHandler}
   ></button>
  )
}

export default Logout