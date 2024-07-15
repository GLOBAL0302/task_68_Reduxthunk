import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodoListThunk,
  fetchTodoThunk,
} from '../../Redux/ReduxSlices/todoSlice';
import { AppDispatch } from '../../Redux/store';
import { Button, Spin } from 'antd';

const TaskForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector((state) => state.todo.isLoadingSubmit);
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
            required
            value={userInput}
            onChange={onChange}
            type="text"
            className="form-control"
            placeholder=""
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
          />
        </div>
        <Button disabled={isLoading} htmlType="submit">
          {isLoading ? <Spin /> : ''}
          Add Task
        </Button>
      </form>
    </>
  );
};

export default TaskForm;
