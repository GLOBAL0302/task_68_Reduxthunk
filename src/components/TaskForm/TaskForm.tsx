import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addTodoListThunk,
  fetchTodoThunk,
} from '../../Redux/ReduxSlices/todoSlice';
import { AppDispatch } from '../../Redux/store';

const TaskForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [userInput, setUserInput] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(addTodoListThunk(userInput));
    dispatch(fetchTodoThunk());
    setUserInput('');
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className="input-group mb-3">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon1"
          >
            Task Title
          </button>
          <input
            value={userInput}
            onChange={onChange}
            type="text"
            className="form-control"
            placeholder=""
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
          />
        </div>
        <button className="ms-auto" type="submit">
          AddTask
        </button>
      </form>
    </>
  );
};

export default TaskForm;
