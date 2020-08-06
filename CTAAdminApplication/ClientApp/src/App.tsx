import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import UserDashboardPage from './components/UserDashboardPage';
import axios from 'axios';
import './custom.css'
axios.defaults.baseURL = process.env.REACT_APP_APIURL;
export default () => (
    <Layout>
        <Route path='/' component={UserDashboardPage} exact={true}/>
        <Route path='/home' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);
