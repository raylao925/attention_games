import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/App';
import Home from './pages/Home';
import Games from './pages/Games';
import Achievements from './pages/Achievements';
import Plan from './pages/Plan';
import Parent from './pages/Parent';
import Profile from './pages/Profile';
import Play from './pages/Play';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'games', element: <Games /> },
      { path: 'achievements', element: <Achievements /> },
      { path: 'plan', element: <Plan /> },
      { path: 'parent', element: <Parent /> },
      { path: 'profile', element: <Profile /> },
      { path: 'play/:gameId', element: <Play /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


