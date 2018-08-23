import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'

import loginSaga from './sagas/loginSaga'
import ordersSaga from './sagas/ordersSaga'
import user from './user'
import orders from './orders';

const rootReducer = combineReducers({
    userState: user,
    orderState: orders
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(loginSaga)
sagaMiddleware.run(ordersSaga)

export default store;