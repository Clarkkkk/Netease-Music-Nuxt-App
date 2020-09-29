const requestURL = 'http://localhost:3000';

function fetchJSON(api) {
  return fetch(requestURL + api)
    .then((body) => {
      if (body.ok) {
        return body.json();
      } else {
        throw new Error('Request failed: ' +
          body.status + ' ' + body.statusText);
      }
    });
}

export default fetchJSON;
