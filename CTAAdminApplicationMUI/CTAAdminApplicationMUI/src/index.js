import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { createBrowserHistory } from 'history';
import 'fontsource-roboto';
import dotenv from 'dotenv';
import axios from 'axios'

//#region AXIOS Common Items
axios.defaults.baseURL = process.env.REACT_APP_APIBASEURL;
// axios.defaults.headers.common['sAPIKey'] = process.env.REACT_APP_APIKEY;
//#endregion

//#region DotEnv Config Call for Custom Env Files
const result = dotenv.config()
// if (result.error) {
//   throw result.error
// }
// console.log(result.parsed)
console.log(process.env.REACT_APP_MYNAME);
//#endregion

const history = createBrowserHistory();
ReactDOM.render((
  <BrowserRouter history={history}>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
