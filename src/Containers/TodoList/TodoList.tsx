import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store.ts';
import { Badge, Checkbox, Spin } from 'antd';

import { DeleteTwoTone} from '@ant-design/icons';
import {
  changeStatusThunk,
  deleteTodoListThunk,
  fetchTodoThunk,
} from '../../Redux/ReduxSlices/todoSlice.ts';
import TaskForm from '../../components/TaskForm/TaskForm.tsx';
import { useEffect } from 'react';

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todoItems = useSelector<RootState>((state) => state.todo.todoItems);
  const isLoadingDelete = useSelector<RootState>(
    (state) => state.todo.isLoadingDelete,
  );
  const isLoadingStatus = useSelector<RootState>(
    (state) => state.todo.isLoadingStatus,
  );

  useEffect(() => {
    dispatch(fetchTodoThunk());
  }, [dispatch]);

  const deleteTodoItem = async (id) => {
    await dispatch(deleteTodoListThunk(id));
    await dispatch(fetchTodoThunk());
  };

  const changeItemList = async (value) => {
    await dispatch(changeStatusThunk(value));
    await dispatch(fetchTodoThunk());
  };

  return (
    <div className="border-5 border p-5">
        <h1>My TodoList</h1>
      <div className="d-flex justify-content-between">
        <p>Completed <Badge color="green" count={todoItems.filter((item)=> item.status === true).length}/></p>
        <p>Uncompleted <Badge count={todoItems.filter((item)=> item.status === false).length}/></p>
      </div>
      <div className="d-flex flex-column gap-2 mb-4">
        {todoItems.map((item) => (
          <div className="border border-2 p-4 d-flex" key={item.id}>
            <span>
              <strong>Title:</strong> {item.title}
            </span>
            {isLoadingStatus ? (
              <Spin className="ms-auto me-3" />
            ) : (
              <Checkbox
                className="ms-auto me-3"
                checked={item.status}
                onChange={() => changeItemList(item)}
              />
            )}
            {isLoadingDelete ? (
              <Spin />
            ) : (
              <DeleteTwoTone
                style={{ cursor: 'pointer' }}
                twoToneColor="#eb2f96"
                onClick={() => deleteTodoItem(item.id)}
              />
            )}
          </div>
        ))}
      </div>
      <TaskForm />
    </div>
  );
};

export default TodoList;
