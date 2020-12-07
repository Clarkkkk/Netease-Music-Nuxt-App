/*  Simplied and enhanced version of fetch API  */
import store from '@/store';
let serverURL;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  serverURL = 'http://192.168.50.138:3000';
} else {
  serverURL = 'https://carllllo.work/api';
}
const RETRY_TIMES = 5;
let retryCount = 0;

function fetchJSON(api, init, withCookie = true) {
  // Add timestamp to avoid cache result
  const requestURL = serverURL + api + '?timestamp=' + Date.now();
  let requestBody;
  // if cookie is available, include it in the request
  if (store.state.auth.cookie && withCookie) {
    requestBody = JSON.stringify({
      ...init,
      credentials: 'include',
      cookie: store.state.auth.cookie,
    });
  } else {
    requestBody = JSON.stringify({
      ...init,
    });
  }
  // return a promise generated by a 'post' fetch
  return fetch(requestURL, {
    method: 'post',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: requestBody
  })
    .then((body) => {
      if (body.ok) {
        return body.json();
      } else if (body.status === 301) {
        store.commit('auth/logout');
        console.log('Not loged in.');
      } else {
        throw new Error('Request failed: ' +
          body.status + ' ' + body.statusText);
      }
    })
    // retry while request failed
    .catch((err) => {
      if (err.message.includes('404')) {
        alert('该资源不存在');
        return Promise.reject(err);
      } else if (retryCount > RETRY_TIMES) {
        retryCount = 0;
        console.log('请求超时，请重试。');
      } else {
        retryCount++;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(fetchJSON(api, init));
          }, 300 * retryCount);
        });
      }
    });
}

export default fetchJSON;
