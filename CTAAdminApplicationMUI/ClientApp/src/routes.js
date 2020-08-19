import React from 'react';
// import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
// import MainLayout from 'src/layouts/MainLayout';
import DashboardView from 'src/views/reports/DashboardView';
import AddView from 'src/views/new/AddView';
import EditView from 'src/views/edit/EditView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'adduser', element: <AddView /> },
      { path: 'edituser/:user_Id', element: <EditView /> },
      { path: 'manageuser', element: <DashboardView /> },
      { path: '/', element: <DashboardView /> }
    ]
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '', element: <DashboardView /> }
    ]
  }
];

export default routes;