import { BASE_URL } from "./auth";

class Api {
    constructor(config) {
        this._url = `${config.url}/`;
        this._cardId = config._id;
        this._likesCounter = config.likes;
        this._urlCards = `${this._url}cards`;
        this._urlProfile = `${this._url}users/me`;
        this._urlAvatar = `${this._urlProfile}/avatar`;
    }

    _getResponseData(url, res) {
      if (res.ok) {
        return res.json()}
      return Promise.reject(`Ошибка по адресу ${url}, статус ошибки ${res.status}`)
    }

    getProfileInfo() {
      return fetch(this._urlProfile, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        })
      .then((res) => {
         return this._getResponseData(this._urlProfile, res)
        })
    }

    getCardInfo(cardId) {
      return fetch(`${this._urlCards}/${cardId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        })
      .then((res) => {
          return this._getResponseData(`${this._urlCards}/${cardId}`, res)
        })
    }
    
    getInitialCards() {
      return fetch(this._urlCards, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        })
        .then((res) => {
          return this._getResponseData(this._urlCards, res)
        })
    }

    updateProfile(data) {
      return fetch(this._urlProfile, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
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
      console.log(data)
      return fetch(this._urlCards, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
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
      return fetch(`${this._urlCards}/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
      })
      .then((res) => {
          return this._getResponseData(`${this._urlCards}/${cardId}`, res)
      })
    }
    
    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._urlCards}/${cardId}/likes`, {
        method: `${isLiked ? 'PUT' : 'DELETE'}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
      })
      .then((res) => {
        return this._getResponseData(`${this._urlCards}/${cardId}/likes`, res)
      })
    }

    showLikes(cardId) {
      return fetch(`${this._urlCards}/${cardId}/likes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        })
        .then((res) => {
          return this._getResponseData(`${this._urlCards}/${cardId}/likes`, res)
        })
    }

    updateAvatar(data) {
      return fetch(`${this._urlProfile}/avatar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          avatar: data
        })
        })
        .then(res => {
          return this._getResponseData(`${this._urlProfile}/avatar`, res)
        })
    }

}

const api = new Api({
    url: BASE_URL})

export default api;