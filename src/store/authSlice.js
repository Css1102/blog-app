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
    // MapObj:new Array()
    likeCount:Math.floor(Math.random()*100)+50,
}

const authSlice=createSlice({
name:'auth',
initialState,
reducers:{
login:(state,action)=>{
console.log(state)
 state.status=true,
 state.userData=action.payload.userData;
},
logout:(state,action)=>{
 state.status=false,
 state.userData=null
},
// addToMap:(state,action)=>{
// console.log(action)
// state.MapObj.push(action.reduceObj)
// }
}
})
export default authSlice.reducer
export const{ login,logout }=authSlice.actions
