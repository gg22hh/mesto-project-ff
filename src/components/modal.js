const closePopupOnEscape = (e , popup) => {
  if (e.code === 'Escape') {
    popup.classList.remove('popup_is-opened')
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', (e) => closePopupOnEscape(e, popup))
}

const closePopup = (e, popup) => {
  if (e.target.className === 'popup__close' || e.target.classList[0] === 'popup') {
    popup.classList.remove('popup_is-opened')
    document.removeEventListener('click', closePopupOnEscape)
  }
}

export {openPopup, closePopup}