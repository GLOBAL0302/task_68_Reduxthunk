import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store.ts';
import { Checkbox } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';

const TodoList = () => {
  const todoItems = useSelector<RootState>(state=>state.todo.todoItems)
  console.log(todoItems);
  return (
    <div className="border-5 border p-5">
      <h1>My TodoList</h1>
      {todoItems.map(item=>(
        <div
          className="border border-2 p-4 d-flex"
          key={item.id}>
          <span><strong>Title:</strong> {item.title}</span>
          <Checkbox  className="ms-auto me-3"/>
          <DeleteTwoTone style={{cursor:"pointer"}} twoToneColor="#eb2f96"/>
        </div>
      ))}
    </div>
  );
}

export default TodoList;