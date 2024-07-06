import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {TodoProvider} from './context/Todo'
import TodoForm from './component/TodoForm'
import TodoItem from './component/TodoItem'
import { useTodo } from './context/Todo'
function App() {
  const[todos,setTodos]=useState([])
// defining each of the methods and their functionality.

// adds a new object into the todo array assigning the id, todo and the completed keys of the object.
  const addTodo=(todo)=>{
  setTodos((prev)=>[{id:Date.now(),...todo}, ...prev])
  }

  const updateTodo=(id,todo)=>{
  setTodos((prev)=>prev.map((prevtodo)=>prevtodo.id===todo.id? todo:prevtodo))
  }

  const deleteTodo=(id)=>{
  setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }
  // Changes the boolean key of completed inside the todo array's object. 
  const toggleComplete=(id)=>{
    setTodos((prev)=>
    prev.map((todoIter)=>
    todoIter.id===id?{...todoIter,completed:!todoIter.completed}
    :todoIter))
  
  }

// The below use effect is called only once and is used to fetch the todo item from the local storage.
  useEffect(()=>{
      const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  },[])
// The below useEffect runs everytime we need to set a todo into the local storage it is re-rendered
// with the dependency of todos.
  useEffect(()=>{
  localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  return (
    // <TodoProvider value={{todo,addTodo,updateTodo,deleteTodo,toggleComplete}}>
    // <TodoForm/>
    // todos.map((todo)=>{
    // <div key={todo.id}></div>
    // <TodoItem/>
    // })
    // </TodoProvider>

    // Note:fetching the props from the context using TodoProvider tag and importing it's methods.
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                  <div className="mb-4">
                      {/* Todo form goes here */} 
                      <TodoForm />
                  </div>
                  <div className="flex flex-wrap gap-y-3">
                      {/*Loop and Add TodoItem here */}
                      {todos.map((todo) => (
                        <div key={todo.id}
                        className='w-full'
                        >
                          <TodoItem todo={todo} />
                        </div>
                      ))}
                  </div>
              </div>
          </div>
  </TodoProvider>

  )
}

export default App
