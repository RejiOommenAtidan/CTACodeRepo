// //#region require Section
// import dotenv from 'dotenv'
// const a = require('dotenv').config()
// console.log(a);
// console.log(process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX);
// const aa = dotenv.config()
// console.log(process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX);
// //#endregion

//#region Imports
import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import axios from 'axios';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
//#endregion

//#region AXIOS Common Items
axios.defaults.baseURL = process.env.REACT_APP_APIURL;
// axios.defaults.headers.common['sAPIKey'] = process.env.REACT_APP_APIKEY;
//#endregion


//#region Headers Adding at interceptions
// res.setHeader("Access-Control-Allow-Headers",
//   "Access-Control-Allow-Headers, 
//   Origin, 
//   Accept, 
//   X-Requested-With, 
//   Content-Type, 
//   Access-Control-Request-Method, 
//   Access-Control-Request-Headers, 
//   Authorization,
//   username")
// res.setHeader('Cache-Control', 'no-cache');
// next();
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   config.setHeader("Access-Control-Allow-Headers","Access-Control-Allow-Headers,Origin, Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization,username");
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });
//#endregion

//#region Configure Store
const store = configureStore();
//#endregion

//#region Make JSX using Client Side Routing in JSX & Enable Store
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
//#endregion

//#region Render JSX
ReactDOM.render(jsx, document.getElementById('app'));
//#endregion