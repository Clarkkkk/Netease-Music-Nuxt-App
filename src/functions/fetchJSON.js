import store from '@/store.js';
const requestURL = 'http://192.168.50.138:3000';
const RETRY_TIMES = 1;
let retryCount = 0;

function fetchJSON(api, init) {
  console.log(JSON.stringify({
    ...init,
    credentials: 'include',
    cookie: store.state.cookie,
    timestamp: Date.now()
  }));
  let requestBody;
  if (store.state.cookie) {
    requestBody = JSON.stringify({
      ...init,
      credentials: 'include',
      cookie: store.state.cookie,
      timestamp: Date.now()
    });
  } else {
    requestBody = JSON.stringify({
      ...init,
      timestamp: Date.now()
    });
  }
  return fetch(requestURL + api, {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: requestBody
  })
    .then((body) => {
      console.log(body);
      if (body.ok) {
        return body.json();
      } else if (body.status === 301) {
        store.commit('logout');
        console.log('Not loged in.');
      } else {
        throw new Error('Request failed: ' +
          body.status + ' ' + body.statusText);
      }
    })
    .catch((err) => {
      if (retryCount > RETRY_TIMES) {
        retryCount = 0;
        console.log('请求超时，请重试。');
        console.log(err.message);
      } else {
        retryCount++;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(fetchJSON(api));
          }, 300);
        });
      }
    });
}

export default fetchJSON;
