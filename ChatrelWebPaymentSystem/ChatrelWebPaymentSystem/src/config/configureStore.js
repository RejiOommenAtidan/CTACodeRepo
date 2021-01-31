

import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';

import sessionstorage from 'redux-persist/lib/storage/session';
//import thunk from 'redux-thunk';



const persistConfig = {
  key: 'CTASS',
  storage: sessionstorage,
  
  whitelist: ['GLoginReducer','GBDetailsReducer','CurrentGBDetailsReducer','SessionReducer']
};

const persistedReducer = persistReducer(persistConfig, combineReducers({ ...reducers }));

export const store = createStore(
  persistedReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);



// export default function configureStore() {
//   return createStore(
//     combineReducers({
//       ...reducers
//     }),
//     {},
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
// }

