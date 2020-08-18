import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
// import axios from 'axios'
// //#region AXIOS Common Items
// axios.defaults.baseURL = process.env.REACT_APP_APIURL;
// // axios.defaults.headers.common['sAPIKey'] = process.env.REACT_APP_APIKEY;
// //#endregion

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
