import React, { useEffect } from 'react';
import { useGlobalContext } from './Context/AppContext';
import { useGlobalAuthContext } from './Context/AuthContext';

import Task from './Task';

const Home = () => {
  const { editing, task, setTask, list, handleSubmit, toggleTheme, fetchApi } =
    useGlobalContext();
  const { user, logoutUser } = useGlobalAuthContext();
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <>
      <div className='container'>
        <div id='task-container'>
          <header className='flex'>
            <h1 className='mb-4 text-primary'>Todo App</h1>
            <i
              className='fas fa-moon mb-4 '
              id='mode'
              onClick={toggleTheme}
            ></i>
          </header>
          <div className='flex mb-2'>
            <p className='lead welcome-text'>( Hello, {user.username}! ) </p>
            <button
              className='btn btn-sm btn-secondary mb-3'
              onClick={() => logoutUser()}
            >
              Logout
            </button>
          </div>
          <form
            action=''
            id='form'
            className='d-flex'
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              required
              type='text'
              className='form-control'
              style={{ flex: '6' }}
              placeholder='Add Task'
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
            <button
              type='submit'
              style={{ flex: '1' }}
              className='btn btn-primary rounded-0'
            >
              {editing ? 'Edit' : 'Submit'}
            </button>
          </form>
          <div id='list-wrapper'>
            {list.map((task, index) => {
              return <Task {...task} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
