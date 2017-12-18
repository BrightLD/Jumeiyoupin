import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger'
import reducer from './reducers/index';
let store=createStore(reducer,applyMiddleware(thunk,promise,logger));
export default store;