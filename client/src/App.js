import { Landing, Error, Register } from './pages/index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

{
  // these woudl be used with BrowserRouter
  /* <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Dashboard</div>} />
      <Route path="/register" element={<div>Register</div>} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<div>Error</div>}>
    </Routes>
</BrowserRouter> */
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>db</div>,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/landing',
    element: <Landing />,
  },
  {
    path: '*',
    element: <Error />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>;
    </>
  );
}

export default App;
