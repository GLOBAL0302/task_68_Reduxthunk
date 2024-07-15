import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IToDoItem } from '../../types';

interface TodoState {
  todoItems: IToDoItem[];
  error: boolean;
  isLoadingSubmit: boolean;
  isLoadingDelete: boolean;
  isLoadingStatus: boolean;
}
const initialState: TodoState = {
  todoItems: [],
  error: false,
  isLoadingSubmit: false,
  isLoadingDelete: false,
  isLoadingStatus: false,
};

export const fetchTodoThunk = createAsyncThunk<IToDoItem[]>(
  'todo/fetch',
  async () => {
    let { data } = await axiosApi.get('/todo.json');
    if (data) {
      return Object.keys(data).map((id) => ({
        ...data[id],
        id,
      }));
    }
    return [];
  },
);

export const addTodoListThunk = createAsyncThunk(
  'todo/addTodoList',
  async (_arg: string) => {
    const newPost = { title: _arg, status: false };
    await axiosApi.post('/todo.json', newPost);
    return;
  },
);

export const deleteTodoListThunk = createAsyncThunk(
  'todo/deleteTodoItem',
  async (_arg: string) => {
    await axiosApi.delete(`/todo/${_arg}.json`);
    return;
  },
);

export const changeStatusThunk = createAsyncThunk(
  'todo/changeStatus',
  async (_arg: IToDoItem) => {
    const changedTodoList = { ..._arg, status: !_arg.status };
    await axiosApi.put(`/todo/${_arg.id}.json`, changedTodoList);
    return;
  },
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<string>) => {
      state.todoItems = state.todoItems.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            status: !item.status,
          };
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoThunk.pending, (state: TodoState) => {
      state.isLoadingSubmit = true;
      state.error = false;
    });
    builder.addCase(fetchTodoThunk.fulfilled, (state: TodoState, action) => {
      state.isLoadingSubmit = false;
      state.todoItems = action.payload;
    });
    builder.addCase(fetchTodoThunk.rejected, (state: TodoState) => {
      state.isLoadingSubmit = false;
      state.error = true;
    });

    builder.addCase(deleteTodoListThunk.pending, (state: TodoState) => {
      state.isLoadingDelete = true;
      state.error = false;
    });
    builder.addCase(
      deleteTodoListThunk.fulfilled,
      (state: TodoState, action) => {
        state.isLoadingDelete = false;
      },
    );
    builder.addCase(deleteTodoListThunk.rejected, (state: TodoState) => {
      state.isLoadingDelete = false;
      state.error = true;
    });

    builder.addCase(changeStatusThunk.pending, (state: TodoState) => {
      state.isLoadingStatus = true;
      state.error = false;
    });
    builder.addCase(changeStatusThunk.fulfilled, (state: TodoState, action) => {
      state.isLoadingStatus = false;
    });
    builder.addCase(changeStatusThunk.rejected, (state: TodoState) => {
      state.isLoadingStatus = false;
      state.error = true;
    });
  },
});

export const todoSliceReducer = todoSlice.reducer;
export const { changeStatus, deleteToDoItem } = todoSlice.actions;
