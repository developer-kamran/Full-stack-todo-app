import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalAuthContext } from '../Context/AuthContext';

const Register = () => {
  const { registerUser } = useGlobalAuthContext();
  return (
    <div id='task-container' style={{ maxWidth: '500px' }}>
      <h1 className='text-primary mb-4'>Register</h1>
      <form action='' onSubmit={(e) => registerUser(e)}>
        <div className='form-group my-4'>
          <input
            required
            type='text'
            className='form-control '
            name='username'
            placeholder='Name'
          />
        </div>
        <div className='form-group my-4'>
          <input
            required
            type='email'
            className='form-control'
            name='email'
            placeholder='Email'
          />
        </div>
        <div className='form-group my-4'>
          <input
            required
            type='password'
            className='form-control '
            name='password'
            placeholder='Password'
          />
        </div>
        <div className='form-group my-4'>
          <input
            required
            type='password'
            className='form-control '
            name='password_confirm'
            placeholder='Confirm Password'
          />
        </div>
        <button type='submit ' className='btn btn-primary text-center'>
          Register
        </button>
      </form>
      <p style={{ marginTop: '10px' }}>
        Already have an account? <Link to='/login'>Login here!</Link>
      </p>
    </div>
  );
};

export default Register;
