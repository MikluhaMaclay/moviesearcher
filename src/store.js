import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './Reducers/rootReducer';
import { saveState } from './utils/localStorage';
import rootSaga from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
