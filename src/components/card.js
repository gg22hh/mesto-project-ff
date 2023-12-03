const cardTemplate = document.querySelector('#card-template').content;

const deleteCard = (card) => card.remove();

const likeCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active')
}

const createCard = (data, deleteFunction, likeCard, openImagePopup) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = card.querySelector('.card__like-button')
  const cardImage = card.querySelector('.card__image')
  cardImage.src = data.link;
  cardImage.alt = 'Image';
  card.querySelector('.card__title').textContent = data.name;
  card.querySelector('.card__delete-button').addEventListener('click', () => deleteFunction(card));
  cardImage.addEventListener('click', () => openImagePopup(cardImage, data.name))
  likeButton.addEventListener('click', () => likeCard(likeButton))
  return card;
};

export {createCard, deleteCard, likeCard}