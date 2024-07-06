// creation of reducer to change values in the store
import { createSlice,nanoid } from "@reduxjs/toolkit";
// initial values in the state in the form of an object of arrays.
const initialState={
todos: [{id:1,text:"Hello World",}]
}
// syntax of declaration of reducer. It has a object having a string name, a method initialState defined 
// above and reducer object which further contains functions that are actually the reducers.
// These functions need to be described inside the object and they recieve two values as imput
// the state which is holding the current context of the initialState and action which contains 
// the values needed to make changes in the state. The value can be retrieved using action.payload()
export const TodoSlice=createSlice({
name:'todo',
initialState,
reducers:{
// Adding an object into the todos array taking its values from action.
addTodo:(state,action)=>{
const todo={
id:nanoid(),
text:action.payLoad
}
state.todos.push(todo)
},
// Removing an object from the todos array by using the id provided in action
removeTodo:(state,action)=>{
state.todos=state.todos.filter((todoid)=>todoid.id!==action.payLoad)
},
}
})
// first export of the reducers is  for the store to be aware of them. 
// second one is for them being used in the components.
export const {addTodo,removeTodo}=TodoSlice.actions
export default TodoSlice.reducer