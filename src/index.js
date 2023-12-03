import './index.css'
import { initialCards } from './components/cards';
import {createCard, deleteCard, likeCard} from './components/card'
import {openPopup, closePopup} from './components/modal' 

const cardsList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button')
const editProfileButton = document.querySelector('.profile__edit-button')

const popupNewCard = document.querySelector('.popup_type_new-card')
const popupEdit = document.querySelector('.popup_type_edit')
const popupImage = document.querySelector('.popup_type_image')

const profileTitle = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')

const editForm = document.forms['edit-profile']
const nameInput = editForm.name
const jobInput = editForm.description

const addForm = document.forms['new-place']
const place = addForm['place-name']
const link = addForm.link

const openImagePopup = (cardImage, caption) => {
  openPopup(popupImage)
  const image = popupImage.querySelector('.popup__image')
  image.src = cardImage.src
  image.alt = cardImage.alt
  popupImage.querySelector('.popup__caption').textContent = caption  
}

initialCards.forEach((initialCard) => {
  const cardToRender = createCard(initialCard, deleteCard, likeCard, openImagePopup);
  cardsList.append(cardToRender);
});

addButton.addEventListener('click', () => openPopup(popupNewCard))

editProfileButton.addEventListener('click', () => {
  openPopup(popupEdit)
  nameInput.value = profileTitle.textContent 
  jobInput.value = profileJob.textContent
})

const handleEditFormSubmit = (e) => {
  e.preventDefault()
  profileTitle.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  popupEdit.classList.remove('popup_is-opened')
}

const handleAddFormSubmit = (e) => {
  e.preventDefault()
  cardsList.prepend(createCard({name: place.value, link: link.value}, deleteCard, likeCard, openImagePopup))
  popupNewCard.classList.remove('popup_is-opened')
  addForm.reset()
}

popupEdit.addEventListener('click', (e) => {
  closePopup(e, popupEdit)
})

popupEdit.addEventListener('submit', handleEditFormSubmit)

popupNewCard.addEventListener('click', (e) => {
  closePopup(e, popupNewCard)
})

popupNewCard.addEventListener('submit', handleAddFormSubmit)

popupImage.addEventListener('click', (e) => {
  closePopup(e, popupImage)
})

