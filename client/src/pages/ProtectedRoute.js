import { Loading } from '../components';
import { useAppCtx } from '../context/appContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useAppCtx();

  if (userLoading) return <Loading center />;
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};
export default ProtectedRoute;
