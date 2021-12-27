import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';

let middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares = [logger];
}

let redux = composeWithDevTools(applyMiddleware(...middlewares));

if (process.env.NODE_ENV === 'production')
  redux = applyMiddleware(...middlewares);

const store = createStore(rootReducer, redux);

const persistor = persistStore(store);

export { store, persistor };
