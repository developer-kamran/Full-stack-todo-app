import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import PrivateRoute from './Authentication/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route
        path='/'
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      ></Route>
      <Route path='*' element={<div>404 Page Not Found.</div>}></Route>
    </Routes>
  );
}
export default App;

{
  /* 
  import { useGlobalAuthContext } from './Context/AuthContext';
  // const { user } = useGlobalAuthContext();
      <Route
        path='/'
        element={user ? <Home /> : <Navigate to='/login' />}
      ></Route>
  */
}
