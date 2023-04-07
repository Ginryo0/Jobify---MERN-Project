import { useAppCtx } from '../context/appContext';

const Alert = () => {
  const { alertType, alertText } = useAppCtx();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};
export default Alert;
