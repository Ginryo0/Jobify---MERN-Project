const FormRow = ({
  type,
  name,
  value,
  changeHandler,
  labelText,
  placeholder,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder ? placeholder : ''}
        onChange={changeHandler}
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
