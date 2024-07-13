
import './App.css'

import TodoList from './Containers/TodoList/TodoList.tsx';
import TaskForm from './components/TaskForm/TaskForm.tsx';

const App = () => {


  return (
    <div className="bg-light p-2 rounded">
      <TodoList/>
    </div>
  )
};

export default App
