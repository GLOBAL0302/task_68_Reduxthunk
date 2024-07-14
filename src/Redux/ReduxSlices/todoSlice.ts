import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

interface TodoState{
  todoItems:IToDoItem[],
  isLoading:boolean,
  error:boolean
}
const initialState:TodoState = {
  todoItems:[],
  isLoading:false,
  error:false
}

export const fetchTodoThunk = createAsyncThunk("todo/fetch", async()=>{
  let {data} = await axiosApi.get("/todo.json");
  if(data){
    const todoItems = Object
      .keys(data).map(id=>({
        ...data[id],
        id
      }))
    return todoItems;
  }
  return;
});

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
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchTodoThunk.pending, (state)=>{
      state.isLoading = true
      state.error = false
    })
    builder.addCase(fetchTodoThunk.fulfilled, (state, action)=>{
      state.isLoading = false
      state.todoItems = action.payload
    })
    builder.addCase(fetchTodoThunk.rejected, (state:TodoState)=>{
      state.isLoading =false
      state.error = true;
    })
  }
});

export const todoSliceReducer = todoSlice.reducer
export const {changeStatus, deleteToDoItem}= todoSlice.actions






