import * as types from '../actionTypes';
import {signUp,login,validate} from '../../api/session';
import {push} from 'react-router-redux';
export default {
  signUp(data){
    return dispatch=>{
      signUp(data).then(payload=>{
        dispatch({
          type:types.SIGN_UP,
          payload
        })
        let {code} = payload;
        if(code == 0)
            dispatch(push('/login'));
      });
    }
  },
  login(data){
    return dispatch=>{
      login(data).then(payload=>{
        dispatch({
          type:types.LOGIN,
          payload
        })
        let {code} = payload;
        if(code == 0)
          dispatch(push('/profile'));
      });
    }
  },
  validate(){
    return dispatch=>{
      validate().then(payload=>{
        dispatch({
          type:types.VALIDATE,
          payload
        })
      });
    }
  }
}