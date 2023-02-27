import React, { useState, useEffect, useContext } from 'react';
import { useGlobalAuthContext } from './AuthContext';
import { csrftoken } from '../library/csrf_token';
import { getStorageTheme } from '../library/theme';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const { authTokens, logoutUser } = useGlobalAuthContext();

  let headers = {
    'Content-type': 'application/json',
    'X-CSRFToken': csrftoken,
  };

  const [list, setList] = useState([]);
  const [task, setTask] = useState({
    id: null,
    title: '',
    completed: false,
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(getStorageTheme());

  const fetchApi = async () => {
    setLoading(true);
    headers['Authorization'] = 'Bearer ' + String(authTokens.access);
    const response = await fetch('http://127.0.0.1:8000/api/tasks/', {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    if (response.status === 200) {
      setList(data);
      setLoading(false);
    } else if (response.statusText === 'Unauthorized') {
      logoutUser();
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = 'http://127.0.0.1:8000/api/tasks/';
    let method = 'POST';
    headers['Authorization'] = 'Bearer ' + String(authTokens.access);

    if (editing) {
      url = `${url}${task.id}/`;
      method = 'PUT';
      setEditing(false);
    }
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(task),
    });
    fetchApi();
    setTask({ ...task, id: null, title: '', completed: false });
  };

  const editTask = (task) => {
    setEditing(true);
    setTask(task);
  };

  const deleteTask = (task) => {
    headers['Authorization'] = 'Bearer ' + String(authTokens.access);
    fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      method: 'DELETE',
      headers,
    }).then((response) => {
      fetchApi();
      setEditing(false);
    });
    setTask({ ...task, id: null, title: '', completed: false });
  };
  const strikeTask = ({ completed, id, title }) => {
    completed = !completed;
    headers['Authorization'] = 'Bearer ' + String(authTokens.access);

    fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ completed, title }),
    }).then((response) => {
      fetchApi();
    });
  };

  const toggleTheme = () => {
    if (theme === 'dark-theme') {
      setTheme('light-theme');
    } else {
      setTheme('dark-theme');
    }
    return theme;
  };
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        loading,
        list,
        task,
        editing,
        fetchApi,
        handleSubmit,
        setTask,
        editTask,
        strikeTask,
        deleteTask,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
