import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store.ts';
import { Checkbox } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
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

  useEffect(() => {
    dispatch(fetchTodoThunk());
  }, [dispatch, todoItems]);

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
      <div className="d-flex flex-column gap-2 mb-4">
        {todoItems.map((item) => (
          <div className="border border-2 p-4 d-flex" key={item.id}>
            <span>
              <strong>Title:</strong> {item.title}
            </span>
            <Checkbox
              className="ms-auto me-3"
              checked={item.status}
              onChange={() => changeItemList(item)}
            />

            <DeleteTwoTone
              style={{ cursor: 'pointer' }}
              twoToneColor="#eb2f96"
              onClick={() => deleteTodoItem(item.id)}
            />
          </div>
        ))}
      </div>
      <TaskForm />
    </div>
  );
};

export default TodoList;
