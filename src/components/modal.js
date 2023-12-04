const closePopupOnEscape = (e) => {
  if (e.code === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'))
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEscape);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('click', closePopupOnEscape);
};

const closePopupByClick = (e) => {
  if (
    e.target.classList.contains('popup__close') ||
    e.target.classList.contains('popup')
  ) {
    closePopup(e.currentTarget);
  }
};

export { openPopup, closePopupByClick, closePopup };
