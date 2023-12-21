const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  authorization: '8914c2f0-088a-4d42-a690-f4fee1444b54'
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const deleteCard = (card, data) => {
  card.remove()
  return fetch(`${config.baseUrl}/cards/${data._id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.authorization,
    },
  })
  .then(res => handleResponse(res))
};

const deslikeCard = (data) => {
  return fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: {
        authorization: config.authorization,
      },
    })
    .then(res => handleResponse(res))
}

const likeCard = (data) => {
  return fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
    method: 'PUT',
    headers: {
      authorization: config.authorization,
    },
  })
  .then(res => handleResponse(res))
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.authorization
    }
  })
  .then((res) => handleResponse(res))
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.authorization
    }
  })
  .then(res => handleResponse(res))
}

const editAvatar = (value) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: value
    })
  })
  .then(res => handleResponse(res))
}

const editProfile = (popup, namValue, jobValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: namValue,
      about: jobValue
    })
  })
  .then(res => handleResponse(res))
}

const addCard = (nameValue, linkValue) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameValue,
      link: linkValue
    })
  })
  .then((res) => handleResponse(res))
}

export {getUserInfo, getInitialCards, editAvatar, editProfile, addCard, deleteCard, deslikeCard, likeCard}