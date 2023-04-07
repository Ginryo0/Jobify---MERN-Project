import React, { useReducer, useContext, useEffect } from 'react';
import reducer from './reducer';
import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: '',
  alertText: '',
};

const AppContext = React.createContext();

const AppCtxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // use effect to clear timer
  useEffect(() => {
    const timer = setTimeout(() => {
      state.showAlert && dispatch({ type: CLEAR_ALERT });
    }, 3000);

    return () => {
      // clear previous timeout
      clearTimeout(timer);
    };
  }, [state]);

  // actions fn
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    // clearAlert()
  };

  // const clearAlert = () => {
  //   const timer = setTimeout(() => {
  //     dispatch({ type: CLEAR_ALERT });
  //   }, 3000);
  // };

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppCtx = () => {
  return useContext(AppContext);
};

export { AppCtxProvider, initialState, useAppCtx };
