const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const createCard = (data, deleteFunction) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = data.link;
  card.querySelector('.card__image').alt = 'Image';
  card.querySelector('.card__title').textContent = data.name;
  card.querySelector('.card__delete-button').addEventListener('click', () => deleteFunction(card));
  return card;
};

const deleteCard = (card) => card.remove();

initialCards.forEach((initialCard) => {
  const cardToRender = createCard(initialCard, deleteCard);
  cardsList.append(cardToRender);
});
