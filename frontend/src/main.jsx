import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { Provider } from 'react-redux';
import appStore from './utlils/appStore';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './App.css';
import './index.css'

import ProfilePage from './components/ProfilePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    },
  {
    path:"/profile",
    element:<ProfilePage/>
  }
]);

root.render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter}>
    </RouterProvider>
  </Provider>
);
