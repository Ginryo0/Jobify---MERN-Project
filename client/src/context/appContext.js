import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import reducer from './reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SIGN_USER_BEGIN,
  SIGN_USER_SUCCESS,
  SIGN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
} from './actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

const initialState = {
  // UI state
  isLoading: false,
  showAlert: false,
  alertType: '',
  alertText: '',
  showSidebar: false,
  // User state
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  // Job state
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: userLocation || '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  // All Jobs state
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
};

const AppContext = React.createContext();

const AppCtxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Instance
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  // Request Interceptor
  authFetch.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  // Response Interceptor
  authFetch.interceptors.response.use(
    (res) => res,
    (err) => {
      console.log(err.response);
      if (err.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(err);
    }
  );

  // ClearAlert - useEffect to clear previous timer
  useEffect(() => {
    // console.log(state);
    const timer = state.showAlert
      ? setTimeout(() => {
          state.showAlert && dispatch({ type: CLEAR_ALERT });
        }, 1500)
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

  const signUser = async (currentUser, endPoint, alertText) => {
    dispatch({ type: SIGN_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      // console.log(response);
      const { user, token, location } = data;
      dispatch({
        type: SIGN_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      // local storage store token
      addUserToLocalStorage(data);
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: SIGN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/update-user', currentUser);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });

      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (!error.response.data.status === 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, status, jobLocation, jobType } = state;

      await authFetch.post('/jobs', {
        position,
        company,
        status,
        jobLocation,
        jobType,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
    } catch (error) {
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getJobs = async () => {
    let url = '/jobs';

    dispatch({ type: GET_JOBS_BEGIN });

    try {
      // get is default - no need to write .get
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
    } catch (error) {
      // errors caught here are probably -> 500 = server is down -> log out then
      console.log(error.response);
      logoutUser();
    }
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        signUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppCtx = () => {
  return useContext(AppContext);
};

export { AppCtxProvider, initialState, useAppCtx };
