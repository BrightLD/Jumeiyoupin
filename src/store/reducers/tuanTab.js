import * as types from '../actionTypes';

let initState = [];
/*
[
    {nav_link:'link',nav_title:'title'}
]*/
export default function tuanTab(state = initState, action) {
    switch (action.type) {
        case types.GET_TUAN_TAB:
            return [...action.payload.data];
        default:
            return state;
    }
}