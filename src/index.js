import './index.css'
import {createCard} from './components/card'
import {openPopup, closePopupByClick, closePopup} from './components/modal' 
import { clearValidation, enableValidation } from './components/validation';
import { addCard, editAvatar, editProfile, getInitialCards, getUserInfo } from './components/api';

const cardsList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button')
const editProfileButton = document.querySelector('.profile__edit-button')

const popupNewCard = document.querySelector('.popup_type_new-card')
const popupEdit = document.querySelector('.popup_type_edit')
const popupImage = document.querySelector('.popup_type_image')
const popupEditAvatar = document.querySelector('.popup_type_edit-profile-avatar')

const profileTitle = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')

const editForm = document.forms['edit-profile']
const nameInput = editForm.name
const jobInput = editForm.description

const addForm = document.forms['new-place']
const place = addForm['place-name']
const link = addForm.link

const editProfileForm = document.forms['edit-profile-avatar']
const editLink = editProfileForm.link

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  linkClass: 'popup__input_type_url'
}

enableValidation(validationConfig)

Promise.all([getUserInfo(), getInitialCards()])
        .then(data => {
          profileName.textContent = data[0].name
          profileDescription.textContent = data[0].about
          profileImage.style.backgroundImage = `url(${data[0].avatar})`
          data[1].forEach((initialCard) => {
            const cardToRender = createCard(initialCard, openImagePopup, data[0]._id);
            cardsList.append(cardToRender);
          });
        })
        .catch(err => console.log(err))

const openImagePopup = (cardImage, caption) => {
  openPopup(popupImage)
  const image = popupImage.querySelector('.popup__image')
  image.src = cardImage.src
  image.alt = cardImage.alt
  popupImage.querySelector('.popup__caption').textContent = caption  
}

addButton.addEventListener('click', () => {
  openPopup(popupNewCard)
})

editProfileButton.addEventListener('click', () => {
  openPopup(popupEdit)
  nameInput.value = profileTitle.textContent 
  jobInput.value = profileJob.textContent
})

profileImage.addEventListener('click', () => {
  openPopup(popupEditAvatar)
})

const handleEditAvatarSubmit = (e) => {
  e.preventDefault()
  const popupButton = popupEditAvatar.querySelector('.popup__button')
  popupButton.textContent = 'Сохранение...'
  editAvatar(editLink.value).then(data => {
    profileImage.style.backgroundImage = `url(${data.avatar})`
    closePopup(popupEditAvatar)
  })
	.catch(err => console.log(err))
  .finally(() => {
    popupButton.textContent = 'Сохранение'
  })
}

const handleEditFormSubmit = (e) => {
  e.preventDefault()
  const popupButton = popupEdit.querySelector('.popup__button')
  popupButton.textContent = 'Сохранение...'
  editProfile(popupEdit, nameInput.value, jobInput.value).then(data => {
    profileTitle.textContent = data.name
    profileJob.textContent = data.about
    closePopup(popupEdit)
  })
  .catch(err => console.log(err))
  .finally(() => popupButton.textContent = 'Сохранение')
}

const handleAddFormSubmit = (e) => {
  e.preventDefault()
  const popupButton = popupNewCard.querySelector('.popup__button')
  popupButton.textContent = 'Сохранение...'
  addCard(place.value, link.value).then(data => {
    cardsList.prepend(createCard(data, openImagePopup, data.owner._id))
    closePopup(popupNewCard)
    form.reset()
  })
	.catch(err => console.log(err))
  .finally(() => popupButton.textContent = 'Сохранение')
}

popupEdit.addEventListener('click', (e) => {
  closePopupByClick(e)
  clearValidation(editForm, validationConfig)
})

popupEdit.addEventListener('submit', handleEditFormSubmit)

popupNewCard.addEventListener('click', closePopupByClick)

popupNewCard.addEventListener('submit', handleAddFormSubmit)

popupImage.addEventListener('click', closePopupByClick)

popupEditAvatar.addEventListener('submit', handleEditAvatarSubmit)

popupEditAvatar.addEventListener('click', closePopupByClick)

