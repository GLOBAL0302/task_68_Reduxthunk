import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store.ts';
import { Checkbox } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { changeStatus, deleteToDoItem } from '../../Redux/ReduxSlices/todoSlice.ts';
import TaskForm from '../../components/TaskForm/TaskForm.tsx';




const TodoList = () => {
  const dispatch = useDispatch()
  const todoItems = useSelector<RootState>(state=>state.todo.todoItems)


  console.log(todoItems);
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