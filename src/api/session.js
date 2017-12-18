import {get,post} from './tuan';
export function signUp(data){
   return post('/signup',data);
}
export function login(data){
   return post('/login',data);
}
export function validate(){
   return get('/validate');
}