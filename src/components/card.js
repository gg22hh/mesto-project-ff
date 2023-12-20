import { deslikeCard } from './api';

const cardTemplate = document.querySelector('#card-template').content;

// const deleteCard = (card, data) => {
//   card.remove()
//   fetch(`https://nomoreparties.co/v1/cohort-magistr-2/cards/${data._id}`, {
//     method: 'DELETE',
//     headers: {
//       authorization: '8914c2f0-088a-4d42-a690-f4fee1444b54',
//     },
//   })
// };

// const deslikeCard = (likeButton, data, likeNumber) => {
//   fetch(`https://nomoreparties.co/v1/cohort-magistr-2/cards/likes/${data._id}`, {
//       method: 'DELETE',
//       headers: {
//         authorization: '8914c2f0-088a-4d42-a690-f4fee1444b54',
//       },
//     })
//     .then(res => {
//       if (res.ok) {
//         return res.json()
//       }
//     })
//     .then(data => {
//       console.log(data.likes, 'likes after delete')
//       likeNumber.textContent = data.likes.length
//       likeButton.classList.remove('card__like-button_is-active')
//     })
// }

// const likeCard = (likeButton, data, likeNumber) => {
//   fetch(`https://nomoreparties.co/v1/cohort-magistr-2/cards/likes/${data._id}`, {
//     method: 'PUT',
//     headers: {
//       authorization: '8914c2f0-088a-4d42-a690-f4fee1444b54',
//     },
//   })
//   .then(res => {
//     if (res.ok) {
//       return res.json()
//     }
//   })
//   .then(data => {
//     console.log(data.likes, 'after Like')
//     likeNumber.textContent = data.likes.length
//     likeButton.classList.add('card__like-button_is-active')
//   })
// }

const createCard = (data, deleteFunction, likeCard, openImagePopup, userId) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = card.querySelector('.card__like-button')
  const likeNumber = card.querySelector('.card__like-number')
  const deleteButton = card.querySelector('.card__delete-button')
  if (data.owner._id !== userId) {
    deleteButton.style.display = 'none'
  }
  const haveMyLike = data.likes.some(like => like._id === userId)
  if (haveMyLike) {
    likeButton.classList.add('card__like-button_is-active')
  }
  likeButton.addEventListener('click', () => {
    if (likeButton.classList.value.includes('card__like-button_is-active')) {
      deslikeCard(likeButton, data, likeNumber)
    } else {
      likeCard(likeButton, data, likeNumber)
    }
  })
  const cardImage = card.querySelector('.card__image')
  likeNumber.textContent = data.likes.length
  cardImage.src = data.link;
  cardImage.alt = data.name;
  card.querySelector('.card__title').textContent = data.name;
  deleteButton.addEventListener('click', () => deleteFunction(card, data));
  cardImage.addEventListener('click', () => openImagePopup(cardImage, data.name))
  return card;
};

export {createCard}