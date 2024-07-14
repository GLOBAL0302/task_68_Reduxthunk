import { configureStore } from '@reduxjs/toolkit';
import { todoSliceReducer } from './ReduxSlices/todoSlice.ts';

export const store = configureStore({
  reducer: {
    todo: todoSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
