import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import reducer from './reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from './actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: '',
  alertText: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
};

const AppContext = React.createContext();

const AppCtxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // use effect to clear timer
  useEffect(() => {
    const timer = state.showAlert
      ? setTimeout(() => {
          state.showAlert && dispatch({ type: CLEAR_ALERT });
        }, 3000)
      : 0;

    return () => {
      // clear previous timeout
      state.showAlert && clearTimeout(timer);
    };
  }, [state]);

  // LocalStorage Funcs
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };

  // actions fn
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    // clearAlert()
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      // console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
      // local storage store token
      addUserToLocalStorage(response.data);
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  // const clearAlert = () => {
  //   const timer = setTimeout(() => {
  //     dispatch({ type: CLEAR_ALERT });
  //   }, 3000);
  // };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppCtx = () => {
  return useContext(AppContext);
};

export { AppCtxProvider, initialState, useAppCtx };
