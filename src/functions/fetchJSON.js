const requestURL = 'http://localhost:3000';
let retryCount = 0;

function fetchJSON(api) {
  return fetch(requestURL + api)
    .then((body) => {
      if (body.ok) {
        return body.json();
      } else {
        throw new Error('Request failed: ' +
          body.status + ' ' + body.statusText);
      }
    })
    .catch((err) => {
      if (retryCount > 10) {
        retryCount = 0;
        throw new Error('请求超时，请重试。');
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
