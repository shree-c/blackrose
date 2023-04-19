import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import ProtectedHome from './Pages/ProtectedHome';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ExoSkeleton from './components/ExoSkeleton';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ExoSkeleton />,
    children: [
      {
        path: '/',
        element: <ProtectedHome />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
