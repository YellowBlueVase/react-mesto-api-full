export const BASE_URL = 'https://api.kirill-mesto-cloud.nomoredomains.rocks';
// export const BASE_URL = 'http://localhost:3000'

function getResponseData(res) {
    if (res.ok) {
      return res.json()}
    return Promise.reject(`Cтатус ошибки ${res.status}`)
  }

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
       method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({password, email})
   })
   .then((res) => getResponseData(res))
   .then((res) => {
       return res;
   })
   }; 

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then((res) => getResponseData(res))
    .then((data) => {
        localStorage.setItem('jwt', data.token);
        return data;
    })
  };

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) => getResponseData(res))
    .then(data => data)
  } 