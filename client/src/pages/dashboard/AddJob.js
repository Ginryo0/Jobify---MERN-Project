import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppCtx } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const navigate = useNavigate();
  const {
    showAlert,
    alertType,
    displayAlert,
    isEditing,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppCtx();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!company || !position || !jobLocation || !jobType) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  if (showAlert && alertType === 'success') {
    setTimeout(() => {
      navigate('/all-jobs');
    }, 1000);
  }

  const jobInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            changeHandler={jobInputHandler}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            changeHandler={jobInputHandler}
          />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            changeHandler={jobInputHandler}
          />
          {/* Job type & status */}
          <FormRowSelect
            name="status"
            value={status}
            changeHandler={jobInputHandler}
            list={statusOptions}
          />

          <FormRowSelect
            labelText="job type"
            name="jobType"
            value={jobType}
            changeHandler={jobInputHandler}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={submitHandler}
            >
              submit
            </button>

            <button
              className="btn btn-block clear-btn"
              type="button"
              onClick={clearValues}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
