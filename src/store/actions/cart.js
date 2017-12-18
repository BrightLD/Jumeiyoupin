import * as types from '../actionTypes';
/*{
    id: 1,
        title: '意大利款中空男鞋',
    style: '洒红色 40',
    count: 1,
    price: 35,
    initPrice: 35,
    isSel:false
}*/
// action{type:***,payload:{
//  list:[
//          {
/*              id: 1,
                title: '意大利款中空男鞋',
                 style: '洒红色 40',
                  count: 1,
                  price: 35,
                 initPrice: 35,
                  isSel:false
}*/
// ]
// }}

/*action{
    type:***,
    payload:{
        id: 1,
            title: '意大利款中空男鞋',
            style: '洒红色 40',
            count: 1,
            price: 35,
            initPrice: 35,
            isSel:false
    }
}*/
let initState = {
    list:[]
}
let cartList=function (state=initState,action) {
    switch (action.type){
        case types.CHANGE_SEL:
            let list=state.list.map(item=>{
                item.isSel=!item.isSel;
            });
            return {
                list:[...list]
            };
        case types.CHANGE_CART:
            let list=state.list.map(item=>{
                item.isSel=!item.isSel;
            });
            return {
                list:[...list]
            };
        default:
            return state;
    }
}