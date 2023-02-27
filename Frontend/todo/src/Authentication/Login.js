import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalAuthContext } from '../Context/AuthContext';

const Login = () => {
  const { loginUser } = useGlobalAuthContext();
  return (
    <>
      <div
        id='task-container'
        className='login-container'
        style={{ maxWidth: '500px' }}
      >
        <h1 className='text-primary mb-4'>Login</h1>
        <form action='' onSubmit={(e) => loginUser(e)}>
          <div className='form-group my-4'>
            <input
              required
              type='text'
              className='form-control '
              placeholder='Name'
              name='username'
            />
          </div>

          <div className='form-group my-4'>
            <input
              type='password'
              className='form-control '
              name='password'
              placeholder='Password'
              required
            />
          </div>
          <button type='submit ' className='btn btn-primary text-center'>
            Login
          </button>
        </form>
        <p style={{ marginTop: '10px' }}>
          Don't have an account? <Link to='/register'>Register here!</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
