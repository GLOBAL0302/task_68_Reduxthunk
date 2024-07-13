import { createSlice } from '@reduxjs/toolkit';

interface TodoState{
  todoItems:IToDoItem[],
  isLoading:boolean,
  error:boolean
}
const initialState:TodoState = {
  todoItems:[{title:"helli", status:false, id:"23"}],
  isLoading:false,
  error:false
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers:{
    changeStatus:(state)=>{
      state.status = !state.status
    }
  }
});

export const todoSliceReducer = todoSlice.reducer
export const {changeStatus}= todoSlice.actions






