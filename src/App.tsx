import './App.css';

import TodoList from './Containers/TodoList/TodoList.tsx';

const App = () => {
  return (
    <div className="bg-light p-2 rounded">
      <TodoList />
    </div>
  );
};

export default App;
