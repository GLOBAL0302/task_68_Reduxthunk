import React, { useState } from 'react';

const TaskForm = () => {
  const [userInput, setUserInput] = useState('');

  const onChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setUserInput(event.target.value);
  }


  const onFormSubmit = (event:React.FormEvent)=>{
    event.preventDefault()
    console.log(userInput)
  }
  return (
    <>
     <form onSubmit={onFormSubmit}>
       <div className="input-group mb-3">
         <button
           className="btn btn-outline-secondary"
           type="button" id="button-addon1">Button</button>
         <input
           onChange={onChange}
           type="text"
           className="form-control"
           placeholder="" aria-label="Example text with button addon"
           aria-describedby="button-addon1"/>
       </div>
       <button type="submit">
         Add New Task
       </button>
     </form>
    </>
  );
};

export default TaskForm;