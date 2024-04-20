import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Tasklist from './components/Tasklist/Tasklist';
import App from './components/App/App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/tasklist",
    element: <Tasklist />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
