import * as types from '../actionTypes';
let initState={list:[]};
export default function cart(state=initState,action) {
    switch (action.type){
        case types.MOD_CART:
            let newList=action.payload.list.map(item=>{
                if(item.isSel==undefined){
                    item.isSel=false;
                }
                return item;
            });
            return {list:[...newList]};
        case types.ADD_CART:
            let newItem=action.payload;
            if(state.list.some(item=>item.id==action.payload.id&&item.style==action.payload.style)){
                return {
                    list:[...state.list.map(item=>{
                            if(item.id==action.payload.id){
                                item.count+=1;
                            }
                            return item;
                        }
                    )]
                }
            }
            newItem.isSel=false;

            return {list: [...state.list,newItem]};
        default:
            return state;
    }
}