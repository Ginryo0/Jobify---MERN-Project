import { useState } from 'react';
import { FormRow, Alert } from '../../components';
import { useAppCtx } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppCtx();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName, location });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            changeHandler={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={lastName}
            changeHandler={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="text"
            name="email"
            value={email}
            changeHandler={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            changeHandler={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
