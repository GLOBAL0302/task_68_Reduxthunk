import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store.ts';
import { Checkbox } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { changeStatus, deleteToDoItem, fetchTodoThunk } from '../../Redux/ReduxSlices/todoSlice.ts';
import TaskForm from '../../components/TaskForm/TaskForm.tsx';
import { useEffect } from 'react';



const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const todoItems = useSelector<RootState>(state=>state.todo.todoItems)
  const isLoading = useSelector<RootState>(state => state.todo.isLoading)


  useEffect( () => {
    dispatch(fetchTodoThunk())
  }, [dispatch]);
  return (
    <div className="border-5 border p-5">
      <h1>My TodoList</h1>
      <div className="d-flex flex-column gap-2 mb-4">
        {todoItems.map(item=>(
          <div
            className="border border-2 p-4 d-flex"
            key={item.id}>
            <span><strong>Title:</strong> {item.title}</span>
            <Checkbox
              className="ms-auto me-3"
              checked={item.status}
              onChange={()=>dispatch(changeStatus(item.id))}/>
            <DeleteTwoTone
              style={{cursor:"pointer"}}
              twoToneColor="#eb2f96"
              onClick={()=>dispatch(deleteToDoItem(item.id))}
            />
          </div>
        ))}
      </div>
      <TaskForm/>
    </div>
  );
}

export default TodoList;