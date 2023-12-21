import { deleteCard, deslikeCard, likeCard } from './api';

const cardTemplate = document.querySelector('#card-template').content;

const createCard = (data, openImagePopup, userId) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = card.querySelector('.card__like-button')
  const likeNumber = card.querySelector('.card__like-number')
  const deleteButton = card.querySelector('.card__delete-button')
  if (data.owner._id !== userId) {
    deleteButton.style.display = 'none'
  } else {
    deleteButton.addEventListener('click', () => deleteCard(card, data).catch(err => console.log(err)));
  }
  const haveMyLike = data.likes.some(like => like._id === userId)
  if (haveMyLike) {
    likeButton.classList.add('card__like-button_is-active')
  }
  likeButton.addEventListener('click', () => {
    if (likeButton.classList.value.includes('card__like-button_is-active')) {
      deslikeCard(data).then(data => {
        console.log(data.likes, 'likes after delete')
        likeNumber.textContent = data.likes.length
        likeButton.classList.remove('card__like-button_is-active')
      })
      .catch(err => console.log(err))
    } else {
      likeCard(data).then(data => {
        console.log(data.likes, 'after Like')
        likeNumber.textContent = data.likes.length
        likeButton.classList.add('card__like-button_is-active')
      })
      .catch(err => console.log(err))
    }
  })
  const cardImage = card.querySelector('.card__image')
  likeNumber.textContent = data.likes.length
  cardImage.src = data.link;
  cardImage.alt = data.name;
  card.querySelector('.card__title').textContent = data.name;
  cardImage.addEventListener('click', () => openImagePopup(cardImage, data.name))
  return card;
};

export {createCard}