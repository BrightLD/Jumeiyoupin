import * as types from '../actionTypes';

/*let initState = {
    isMore: 1,
    offset: 0,
    limit: 5,
    data: []
};*/
let initTuan=[];
/*[{
    name:'abc',
    isMore:1,
    pages:1,
    list:[]
    }
]
* */
/*let Group = function initGroup(state = initState, action) {
    switch (action.type) {
        case types.GET_GROUP_STORE:
            return {
                offset: state.offset + state.limit,
                limit: 5,
                isMore: action.payload.data.isMore,
                data: [...state.data, ...action.payload.data.list]
            };

        default:
            return state;
    }
}*/
let Tuan = function (state = initTuan, action) {
    switch (action.type) {
        case types.GET_TUAN:
            let newState=state.map(item=>{
                if(item.name==action.payload.name){
                    return {
                        ...item,
                        pages:item.pages+1,
                        list:[...item.list,...action.payload.list]
                    }
                }
                return item;
            })
            if(!newState.some(item=>item.name==action.payload.name)){
                newState.push({
                    pages:2,
                    name:action.payload.name,
                    list:[...action.payload.list]
                })
            }
            return newState;
        default:
            return state;
    }
}
export default Tuan;