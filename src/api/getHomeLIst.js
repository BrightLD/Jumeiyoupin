const HOST = 'http://localhost:3030';

export default function getHomeList(url, data) {
    return fetch(HOST + url, {
        method: 'get',
        credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(res => res.json());
}
