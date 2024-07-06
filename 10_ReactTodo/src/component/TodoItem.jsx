import React from 'react'
import { useState } from 'react'
import {useTodo} from '../context/Todo'
function TodoItem({todo}){
const[isTodoEditable,setTodoEditable]=useState(false);
const[todoMsg,setTodoMsg]=useState((todo.todo))
const{updateTodo,deleteTodo,toggleComplete}=useTodo()

// it updates the keys of the todo array object after it is set to editable. After this we set the 
// editable to default val which is false.
const edit=()=>{
updateTodo(todo.id,{...todo,todo:todoMsg})
setTodoEditable(false)
}
// toggles the completed key of the todo arr object. 
const toggleCompleted=()=>{
    toggleComplete(todo.id)
}
  return (
<div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed?
"bg-[#c6e9a7]":"bg-[#ccbed7]"}`}>
<input type="checkbox" 
// the checkbox will be checked on the basis of todo.completed value. 
checked={todo.completed}
className='cursor-pointer'
onChange={toggleCompleted}
/>
<input type="text"
className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable? "border-black/10 px-2":
"border-transparent"}`} 
value={todoMsg}  
onChange={(e)=>setTodoMsg(e.target.value)}
// if editable is true then readonly is fasle as read and write both acess are there.
// if it is false then readble is true as only read access is there. 
readOnly={!isTodoEditable}
/>
{/* Delete button to remove todo entry using deleteTodo method. */}
<button
className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0
disabled:opacity-50'
onClick={()=>{
  if(todo.completed) return
  if(!isTodoEditable){
  edit();
  }
  else{
  setTodoEditable((prev)=>!prev)
  }
}}
disabled={todo.completed}
>{isTodoEditable? "EDIT":"DONT TOUCH IT"}</button>

<button
className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0'
onClick={()=>deleteTodo(todo.id)}
>DELETE</button>
</div>
  )
}

export default TodoItem;