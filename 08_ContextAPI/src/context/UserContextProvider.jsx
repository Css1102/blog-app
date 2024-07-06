import React,{useState} from "react";
import UserContext from "./UserContext";
// This provides the access of the props to all the components of the web page. 
const UserContextProvider=({children})=>{
const[user,setUser]=useState(null);
return(
<UserContext.Provider 
value={user}>
  {children}
</UserContext.Provider>
)

}
export default UserContextProvider
