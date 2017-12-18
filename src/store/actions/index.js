import * as types from '../actionTypes';

export default {
    init(payload) {
        return {
            type: types.INIT,
            payload
        }
    },
    getHomeList(payload) {
        console.log(payload);
        return {
            type: types.GET_HOME_LIST,
            payload
        }
    },
    initGroup(payload) {
        return {
            type: types.GET_GROUP_STORE,
            payload
        }
    },
    resetHomeList(payload) {
        return {
            type: types.RESET_HOME_LIST,
            payload
        }


    },
    getTuan(payload) {
        return {
            type: types.GET_TUAN,
            payload
        }
    },
    getTuanTab(data) { //获取拼团header数据
        return {
            type: types.GET_TUAN_TAB,
            payload: {
                data
            }
        }
    },
    modCart(data){
        return {
            type:types.MOD_CART,
            payload:{
                list:data
            }
        }
    },
    addCart(data){
        return {
            type:types.ADD_CART,
            payload:data
        }
    }

}