import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: true,
};

const Register = () => {
  const [user, setUser] = useState(initialState);
  // global state and useNavigate

  const toggleMember = () => {
    setUser((prevState) => ({ ...prevState, isMember: !prevState.isMember }));
  };

  const inputChangeHandler = (e) => {
    console.log(e.target);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{user.isMember ? 'Login' : 'Register'}</h3>
        {user.showAlert && <Alert />}
        {!user.isMember && (
          <FormRow
            type="text"
            name="name"
            value={user.name}
            changeHandler={inputChangeHandler}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={user.email}
          changeHandler={inputChangeHandler}
        />
        <FormRow
          type="password"
          name="password"
          value={user.password}
          changeHandler={inputChangeHandler}
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          {user.isMember ? 'Not a member yet' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {user.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
