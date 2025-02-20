import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import CustomerEdit from './CustomerEdit.jsx'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Route, Router, Link } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/customers",
    element: <CustomerEdit />,
  },
])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
