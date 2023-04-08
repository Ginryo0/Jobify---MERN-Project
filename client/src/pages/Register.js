import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppCtx } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [regState, setRegState] = useState(initialState);
  // global state and useNavigate
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppCtx();

  const toggleMember = () => {
    setRegState((prevState) => ({
      ...prevState,
      isMember: !prevState.isMember,
    }));
  };

  const inputChangeHandler = (e) => {
    setRegState(() => ({ ...regState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = regState;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{regState.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!regState.isMember && (
          <FormRow
            type="text"
            name="name"
            value={regState.name}
            changeHandler={inputChangeHandler}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={regState.email}
          changeHandler={inputChangeHandler}
        />
        <FormRow
          type="password"
          name="password"
          value={regState.password}
          changeHandler={inputChangeHandler}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {regState.isMember ? 'Not a member yet' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {regState.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
