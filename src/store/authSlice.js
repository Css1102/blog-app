import {createSlice} from '@reduxjs/toolkit'
// import { store } from './store'
// class ImplementLike{ 
// userId;
// postId;
// likeCount;
// constructor(userId,postId,likeCount){
// this.userId=userId;
// this.postId=postId;
// this.likeCount=likeCount;
// }
// }
// MapLike.set(post.$id,likeCount)
const initialState={
    status:false,
    userData:null,
    UpvotedObj:null,
}

const authSlice=createSlice({
name:'auth',
initialState,
reducers:{
login:(state,action)=>{
console.log(action.payload)
 state.status=true,
 state.userData=action.payload;
},
logout:(state,action)=>{
 state.status=false,
 state.userData=null
},
upvoted:(state,action)=>{
console.log(action.payload)
state.UpvotedObj=action.payload
},
}
})
export default authSlice.reducer
export const{ login,logout,upvoted,setAuth }=authSlice.actions
