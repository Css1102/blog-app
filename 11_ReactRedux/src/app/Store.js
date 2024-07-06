// A central store where all the data will be stored and it is configured from the redux toolkit
// it needs information of all the reducers that are there. 
import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "../features/todo/TodoSlice";
export const Store=configureStore({
  reducer:TodoSlice()
})