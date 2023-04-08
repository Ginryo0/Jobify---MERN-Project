import { Landing, Error, Register, ProtectedRoute } from './pages/index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  AllJobs,
  Profile,
  SharedLayout,
  AddJob,
  Stats,
} from './pages/dashboard';
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
    element: (
      <ProtectedRoute>
        <SharedLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Stats /> },
      { path: 'all-jobs', element: <AllJobs /> },
      { path: 'add-job', element: <AddJob /> },
      { path: 'profile', element: <Profile /> },
    ],
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
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
