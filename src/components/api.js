import { createCard } from './card'
import { closePopup } from './modal'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  authorization: '8914c2f0-088a-4d42-a690-f4fee1444b54'
}

const deleteCard = (card, data) => {
  card.remove()
  fetch(`${config.baseUrl}/cards/${data._id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.authorization,
    },
  })
	.catch(err => console.log(err))
};

const deslikeCard = (likeButton, data, likeNumber) => {
  fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: {
        authorization: config.authorization,
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
			return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      console.log(data.likes, 'likes after delete')
      likeNumber.textContent = data.likes.length
      likeButton.classList.remove('card__like-button_is-active')
    })
		.catch(err => console.log(err))
}

const likeCard = (likeButton, data, likeNumber) => {
  fetch(`${config.baseUrl}/cards/likes/${data._id}`, {
    method: 'PUT',
    headers: {
      authorization: config.authorization,
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
		return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    console.log(data.likes, 'after Like')
    likeNumber.textContent = data.likes.length
    likeButton.classList.add('card__like-button_is-active')
  })
	.catch(err => console.log(err))
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.authorization
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
		return Promise.reject(`Ошибка: ${res.status}`);
  })
	.catch(err => console.log(err))
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.authorization
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
		return Promise.reject(`Ошибка: ${res.status}`);
  })
	.catch(err => console.log(err))
}

const fetchToAvatarEdit = (popup, value, profile) => {
	const popupButton = popup.querySelector('.popup__button')
  popupButton.textContent = 'Сохранение...'
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: value
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
		return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    popupButton.textContent = 'Сохранение'
    profile.style.backgroundImage = `url(${data.avatar})`
    closePopup(popup)
  })
	.catch(err => console.log(err))
}

const fetchToProfileEdit = (popup, namValue, jobValue) => {
	const popupButton = popup.querySelector('.popup__button')
  popupButton.textContent = 'Сохранение...'
  fetch(`${config.baseUrl}/users/me`, {
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
  .then(res => {
    if (res.ok) {
      popupButton.textContent = 'Сохранение'
      closePopup(popup)
    }
		return Promise.reject(`Ошибка: ${res.status}`);
  })
	.catch(err => console.log(err))
}

const fetchToAddCard = (popup, nameValue, linkValue, form, cards, openImagePopup,) => {
	const popupButton = popup.querySelector('.popup__button')
  popupButton.textContent = 'Сохранение...'
  fetch(`${config.baseUrl}/cards`, {
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
  .then((res) => {
    if (res.ok) {
      popupButton.textContent = 'Сохранение'
      closePopup(popup)
      form.reset()
      return res.json()
    }
		return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => cards.prepend(createCard(data, deleteCard, likeCard, openImagePopup, data.owner._id)))
	.catch(err => console.log(err))
}

export {getUserInfo, getInitialCards, fetchToAvatarEdit, fetchToProfileEdit, fetchToAddCard, deleteCard, deslikeCard, likeCard}