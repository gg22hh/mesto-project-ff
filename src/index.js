import './index.css'
import { initialCards } from './components/cards';
import {createCard} from './components/card'
import {openPopup, closePopupByClick, closePopup} from './components/modal' 
import { clearValidation, enableValidation } from './components/validation';
import { deleteCard, fetchToAddCard, fetchToAvatarEdit, fetchToProfileEdit, getInitialCards, getUserInfo, likeCard } from './components/api';

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

// const getUserInfo = () => {
//   return fetch('https://nomoreparties.co/v1/cohort-magistr-2/users/me', {
//     headers: {
//       authorization: '8914c2f0-088a-4d42-a690-f4fee1444b54'
//     }
//   })
//   .then((res) => {
//     if (res.ok) {
//       return res.json()
//     }
//   })
// }

// const getInitialCards = () => {
//   return fetch('https://nomoreparties.co/v1/cohort-magistr-2/cards', {
//     headers: {
//       authorization: '8914c2f0-088a-4d42-a690-f4fee1444b54'
//     }
//   })
//   .then(res => {
//     if (res.ok) {
//       return res.json()
//     }
//   })
// }

Promise.all([getUserInfo(), getInitialCards()])
        .then(data => {
          profileName.textContent = data[0].name
          profileDescription.textContent = data[0].about
          profileImage.style.backgroundImage = `url(${data[0].avatar})`
          data[1].forEach((initialCard) => {
            const cardToRender = createCard(initialCard, deleteCard, likeCard, openImagePopup, data[0]._id);
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
  enableValidation(validationConfig)
})

editProfileButton.addEventListener('click', () => {
  openPopup(popupEdit)
  nameInput.value = profileTitle.textContent 
  jobInput.value = profileJob.textContent
  enableValidation(validationConfig)
})

profileImage.addEventListener('click', () => {
  openPopup(popupEditAvatar)
  enableValidation(validationConfig)
})

const handleEditAvatarSubmit = (e) => {
  e.preventDefault()
  fetchToAvatarEdit(popupEditAvatar, editLink.value, profileImage)
}

const handleEditFormSubmit = (e) => {
  e.preventDefault()
  fetchToProfileEdit(popupEdit, nameInput.value, jobInput.value)
  profileTitle.textContent = nameInput.value
  profileJob.textContent = jobInput.value
}

const handleAddFormSubmit = (e) => {
  e.preventDefault()
  fetchToAddCard(popupNewCard, place.value, link.value, addForm, cardsList, openImagePopup,)
}

popupEdit.addEventListener('click', (e) => {
  closePopupByClick(e)
  clearValidation(popupEdit, validationConfig)
})

popupEdit.addEventListener('submit', handleEditFormSubmit)

popupNewCard.addEventListener('click', closePopupByClick)

popupNewCard.addEventListener('submit', handleAddFormSubmit)

popupImage.addEventListener('click', closePopupByClick)

popupEditAvatar.addEventListener('submit', handleEditAvatarSubmit)

popupEditAvatar.addEventListener('click', closePopupByClick)

