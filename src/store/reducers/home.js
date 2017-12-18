import * as types from '../actionTypes';

let initState = {
    isMore: 1,
    offset: 0,
    limit: 1,
    data: []
};
let homeList = function (state = initState, action) {
    switch (action.type) {
        case types.GET_HOME_LIST:
            return {
                offset:state.offset+state.limit,
                limit:state.limit,
                isMore: action.payload.isMore,
                data: [...state.data, ...action.payload.data]
            };
        case types.RESET_HOME_LIST:
            return {
                offset:0,
                limit:1,
                isMore: action.payload.isMore,
                data: [...action.payload.data]
            };
        default:
            return state;
    }
};
export default homeList;