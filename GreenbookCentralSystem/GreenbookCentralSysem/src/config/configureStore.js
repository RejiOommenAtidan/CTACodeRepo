import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import thunk from 'redux-thunk';

const persistConfig = {
  key: 'CTALS',
  storage: storage,
  whitelist: ['UserAuthenticationReducer']
};

const persistedReducer = persistReducer(persistConfig, combineReducers({ ...reducers }));

// export default function configureStore() {
//   return createStore(
//     // combineReducers({
//     //   ...reducers
//     // }),
//     persistedReducer,
//     {},
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
// }

// export const configureStore = () => {
//   return createStore(
//     persistedReducer,
//     {},
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
// };

// export const persistStore = () => { persistStore(store) };


export const store = createStore(
  persistedReducer,
  {},
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);


//1st PARAM: COMBINERS
//2nd PARAM: preloadedState (i.e.){}
//3rd PARAM: Enhancer