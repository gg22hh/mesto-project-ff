const hasInvalidInput = (inputList, validationConfig) => {
  return inputList.some(inputElement => {
    if (inputElement.classList.value.includes(validationConfig.linkClass)) {
      return !inputElement.validity.valid
    } else {
      return (!inputElement.validity.valid || (/[^a-zа-яёЁ\s\-]/gi).test(inputElement.value))
    }
  })
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList, validationConfig)) {
    buttonElement.disabled = true
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)
    buttonElement.disabled = false
  }
}

const addEventListener = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
	const popupButton = formElement.querySelector(validationConfig.submitButtonSelector)
	toggleButtonState(inputList, popupButton, validationConfig)
  inputList.forEach(input => {
    input.addEventListener('input', (e) => {
      const errorContainer = formElement.querySelector(`.${input.id}-error`)
      errorContainer.textContent = input.validationMessage
      if (!input.classList.value.includes(validationConfig.linkClass)) {
        if ((/[^a-zа-яёЁ\s\-]/gi).test(e.target.value)) {
          errorContainer.textContent = input.dataset.errorMessage
          input.classList.add(validationConfig.inputErrorClass)
        } else {
          input.classList.remove(validationConfig.inputErrorClass)
        }
      }
      toggleButtonState(inputList, popupButton, validationConfig)
    })
  })
}

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach(form => {
    addEventListener(form, validationConfig)
  })
}

export const clearValidation = (form, validationConfig) => {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector))
  const popupButton = form.querySelector(validationConfig.submitButtonSelector)
  inputList.forEach(input => {
    const errorContainer = form.querySelector(`.${input.id}-error`)
    errorContainer.textContent = ''
    input.classList.remove(validationConfig.inputErrorClass)
		popupButton.disabled = false
		popupButton.classList.remove(validationConfig.inactiveButtonClass)
  })
}