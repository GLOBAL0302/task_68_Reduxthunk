import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoState{
  todoItems:IToDoItem[],
  isLoading:boolean,
  error:boolean
}
const initialState:TodoState = {
  todoItems:[{title:"False Status", status:false, id:"123"}, {title:"True Status", status:true, id:"321"}],
  isLoading:false,
  error:false
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers:{
    changeStatus:(state, action:PayloadAction<string>)=>{
      state.todoItems = state.todoItems.map((item)=>{
        if(item.id === action.payload){
          return {
            ...item,
            status: !item.status}
        }
        return item
      })
    },
    deleteToDoItem:(state, action:PayloadAction<string>)=>{
      state.todoItems = state.todoItems.filter((item)=>{
        if(item.id !== action.payload){
          return item
        }
      })
    }
  }
});

export const todoSliceReducer = todoSlice.reducer
export const {changeStatus, deleteToDoItem}= todoSlice.actions






