import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import reducers from './allReducers';
import ReduxThunk from 'redux-thunk';

const middlewares = [ReduxThunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    ...reducers,
  }),
  {},
  composeEnhancers(applyMiddleware(...middlewares)),
);

//Comment the redux Line After deveopment ends
