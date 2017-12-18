/**
 * Created by boos-hjl on 2017/11/22.
 */
const HOST='http://localhost:3030';
export function signup(data) {
    return fetch(HOST + '/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}
export function login( data) {
    return fetch(HOST + '/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}