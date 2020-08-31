import React from 'react';
import DashboardLayout from 'src/layouts/DashboardLayout';
import DashboardView from 'src/views/reports/DashboardView';
import AddView from 'src/views/new/AddView';
import EditView from 'src/views/edit/EditView';
import MadebView from 'src/views/madeb/MadebView';

const appRoutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'adduser', element: <AddView /> },
      { path: 'edituser/:user_Id', element: <EditView /> },
      { path: 'manageuser', element: <DashboardView /> },
      { path: 'madeb', element: <MadebView /> },
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

export default appRoutes;