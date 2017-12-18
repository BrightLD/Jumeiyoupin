import {combineReducers} from 'redux';
import session from './session';
import * as types from '../actionTypes';
import tuan from './yiqituan';
import tuanTab from './tuanTab'
import cart from './cart'
// 以下仅为demo，
let initState = {};


let initHomeGoodsList = {
    pages:1,
    type:'formal',
    data: [],
};
import {routerReducer} from 'react-router-redux';


function initStore(state = initState, action) {
    switch (action.type) {
        case types.INIT:
            return {...action.payload};
        default:
            return state;
    }
}

function homeGoodsList(state = initHomeGoodsList, action) {
    switch (action.type) {
        case types.GET_HOME_LIST:

            return {
                pages:state.pages+1,
                type:state.type,
                data: [...state.data, ...action.payload.data]
            };
        case types.RESET_HOME_LIST:
            return {
                pages:1,
                type:state.type,
                data: {...state.data, ...action.payload.data}
            };
        default:
            return state;
    }
}
export default combineReducers({initStore, homeGoodsList,tuan,session,tuanTab,cart});
