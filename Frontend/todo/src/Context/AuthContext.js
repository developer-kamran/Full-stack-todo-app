import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getTokenFromStorage, getUserFromStorage } from '../library/user&token';
import { csrftoken } from '../library/csrf_token';

let url = 'http://127.0.0.1:8000/api/';
let headers = {
  'Content-Type': 'application/json',
};
let method = 'POST';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authTokens, setAuthTokens] = useState(() => getTokenFromStorage());
  const [user, setUser] = useState(() => getUserFromStorage());

  const loadUser = (data) => {
    setAuthTokens(data);
    setUser(jwt_decode(data.access));
    localStorage.setItem('authTokens', JSON.stringify(data));
  };
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.password_confirm.value) {
      window.alert('Password do not match.');
      e.target.password.value = '';
      e.target.password_confirm.value = '';
    } else {
      headers['X-CSRFToken'] = csrftoken;
      const response = await fetch(`${url}register/`, {
        method,
        headers,
        body: JSON.stringify({
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        setTimeout(() => {
          navigate('/login');
        }, 1300);
      } else {
        console.log(data);
      }
    }
  };

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch(`${url}token/`, {
      method,
      headers,
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      loadUser(data);
      navigate('/');
    } else {
      alert('Something went wrong!');
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  const updateToken = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
      method,
      headers,
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    let data = await response.json();

    if (response.status === 200) {
      loadUser(data);
    } else {
      logoutUser();
    }
    if (loading) setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    const fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authTokens,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useGlobalAuthContext = () => {
  return useContext(AuthContext);
};
