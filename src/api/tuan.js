const HOST = 'http://localhost:3030';
export default function getTuan(url) {
    return fetch(HOST + url, {
        method: 'get',
        credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(res => res.json());
}

export function post(url, data) {
    return fetch(HOST + url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}