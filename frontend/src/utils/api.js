class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this._cardId = config._id;
        this._likesCounter = config.likes;
        this._urlCards = `${this._url}cards/`;
        this._urlProfile = `${this._url}users/me/`;
    }

    _getResponseData(url, res) {
      if (res.ok) {
        return res.json()}
      return Promise.reject(`Ошибка по адресу ${url}, статус ошибки ${res.status}`)
    }

    // _request(url, options) {
    //   return fetch(url, options).then((res) => {return this._getResponseData(url, res)})
    // }

    // getProfileInfo() {
    //   this._request(this._urlProfile, {
    //     method: 'GET',
    //     headers: this._headers
    //     })
    // }

    getProfileInfo() {
      return fetch(this._urlProfile, {
        method: 'GET',
        headers: this._headers
        })
      .then((res) => {
         return this._getResponseData(this._urlProfile, res)
        })
    }

    getCardInfo(cardId) {
      return fetch(`${this._urlCards}${cardId}`, {
        method: 'GET',
        headers: this._headers
        })
      .then((res) => {
          return this._getResponseData(`${this._urlCards}${cardId}`, res)
        })
    }
    
    getInitialCards() {
      return fetch(this._urlCards, {
        method: 'GET',
        headers: this._headers
        })
        .then((res) => {
          return this._getResponseData(this._urlCards, res)
        })
    }

    updateProfile(data) {
      return fetch(this._urlProfile, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name:data.name,
          about:data.about
        })
        })
        .then(res => {
          return this._getResponseData(this._urlProfile, res)
        })
    }

    addNewCard(data) {
      return fetch(this._urlCards, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
          likes: data.likes,
          owner: data.owner
        })
        })
      .then((res) => {
          return this._getResponseData(this._urlCards, res)
        })
      }

    deleteCard(cardId) {
      return fetch(`${this._urlCards}${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
        })
      .then((res) => {
          return this._getResponseData(`${this._urlCards}${cardId}`, res)
        })
      }
    
    addLike(cardId) {
      return fetch(`${this._urlCards}${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
        })
        .then((res) => {
          return this._getResponseData(`${this._urlCards}${cardId}/likes`, res)
        })
    }
    
    deleteLike(cardId) {
      return fetch(`${this._urlCards}${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
        })
        .then((res) => {
          return this._getResponseData(`${this._urlCards}${cardId}/likes`, res)
        })
    }

    showLikes(cardId) {
      return fetch(`${this._urlCards}${cardId}/likes`, {
        method: 'GET',
        headers: this._headers,
        })
        .then((res) => {
          return this._getResponseData(`${this._urlCards}${cardId}/likes`, res)
        })
    }

    updateAvatar(data) {
      return fetch(`${this._urlProfile}avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar:data
        })
        })
        .then(res => {
          return this._getResponseData(this._urlProfile, res)
        })
    }

}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-49/',
    headers: {
      'content-type': 'application/json',
      Authorization: '2cb75315-5b64-4ef0-b9e0-7942d91d0c8e'
    }})

export default api;