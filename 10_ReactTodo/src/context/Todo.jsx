// creating a custom hook useTodo to provide the context to other components.
import { createContext,useContext } from "react";

export const TodoContext=createContext({
todo:[
{
id:1,
todo:"Todo Message",
completed:false,
}
],
addTodo:(todo)=>{},
updateTodo:(id,todo)=>{},
deleteTodo:(id)=>{},
toggleComplete:(id)=>{},
})

export  const TodoProvider=TodoContext.Provider;

export const useTodo=()=>{
return useContext(TodoContext);
}

export default TodoProvider;