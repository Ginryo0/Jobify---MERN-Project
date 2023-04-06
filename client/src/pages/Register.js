import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
  name: '',
  email: '',
  password: '',
  loggedIn: true,
};

const Register = () => {
  const [user, setUser] = useState(initialState);
  // global state and useNavigate

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
        <h3>Login</h3>
        <FormRow
          type="text"
          name="name"
          value={user.name}
          changeHandler={inputChangeHandler}
        />
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
      </form>
    </Wrapper>
  );
};
export default Register;
