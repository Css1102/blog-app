import Service from './appwrite/ConfigDb.js'
import { useSelector } from 'react-redux'


const jwtFromState=useSelector((state)=>state.auth.jwt)

const service=new Service(jwtFromState)

export default service;