const hasInvalidInput = inputList => inputList.some(inputElement => !inputElement.validity.valid)

const disableSubmitButton = (buttonElement, validationConfig) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
  } else {
    disableSubmitButton(buttonElement, validationConfig)
  }
}

const showInputError = (inputElement, errorMessage, validationConfig, errorContainer) => {
  errorContainer.textContent = errorMessage
  inputElement.classList.add(validationConfig.inputErrorClass)
}

const hideInputError = (inputElement, validationConfig, errorContainer) => {
  errorContainer.textContent = ''
  inputElement.classList.remove(validationConfig.inputErrorClass)
}

const toggleInputValidity= (inputElement, validationConfig, errorContainer) => { 
  if (inputElement.validity.patternMismatch) { 
    inputElement.setCustomValidity(inputElement.dataset.errorMessage); 
  } else { 
    inputElement.setCustomValidity(""); 
  }
  if (!inputElement.validity.valid) { 
    showInputError(inputElement, inputElement.validationMessage, validationConfig, errorContainer); 
  } else { 
    hideInputError(inputElement, validationConfig, errorContainer); 
  }
}; 

const addEventListener = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
	const popupButton = formElement.querySelector(validationConfig.submitButtonSelector)
	toggleButtonState(inputList, popupButton, validationConfig)
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      const errorContainer = formElement.querySelector(`.${input.id}-error`)
      toggleInputValidity(input, validationConfig, errorContainer)
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
		disableSubmitButton(popupButton, validationConfig)
  })
}