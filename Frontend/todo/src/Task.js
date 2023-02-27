import React from 'react';
import { useGlobalContext } from './Context/AppContext';

const Task = ({ title, completed, id }) => {
  const { editTask, deleteTask, strikeTask } = useGlobalContext();

  return (
    <div className='task-wrapper '>
      <button
        className={`btn btn-sm  ${
          completed ? ' btn-success' : ' btn-outline-success'
        }`}
        onClick={() => strikeTask({ completed, id, title })}
      >
        &#10004;
      </button>
      {completed ? <strike>{title}</strike> : <span>{title}</span>}

      <div className='button-container'>
        {!completed && (
          <button
            className='btn btn-sm btn-outline-warning mx-1'
            onClick={() => editTask({ title, completed, id })}
          >
            Edit
          </button>
        )}
        <button
          className='btn btn-sm btn-danger'
          onClick={() => deleteTask({ title, completed, id })}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Task;
