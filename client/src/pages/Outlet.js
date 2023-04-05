import { Link, Outlet } from 'react-router-dom';
const OutletPage = () => {
  return (
    <>
      <nav>
        <Link to="/">Dash</Link>
        <Link to="/landing">Ladning</Link>
        <Link to="/register">reg</Link>
      </nav>
      <Outlet></Outlet>
    </>
  );
};
export default OutletPage;
