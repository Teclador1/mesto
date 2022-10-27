/*Объект settings*/

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-rectangle',
    inactiveButtonClass: 'popup__button-rectangle-disabled',
    inputErrorClass: 'popup__input_error',
    errorMessage: '.popup__span-error'
};

/*Функции*/

const hasInvalidInput = (inputs) => {
    return inputs.some((input) => {
        return !input.validity.valid;
    });
}

const toggleButtonState = (inputs, submitButton) => {
    if (hasInvalidInput(inputs)) {
        submitButton.setAttribute('disabled', true)
        submitButton.classList.add(settings.inactiveButtonClass);
        submitButton.classList.remove('popup__button-rectangle');
    } else {
        submitButton.removeAttribute('disabled')
        submitButton.classList.add('popup__button-rectangle');
        submitButton.classList.remove(settings.inactiveButtonClass);
    }
}


const enableValidation = () => {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setValidationEventListeners(form);
    });
};

const setValidationEventListeners = (form) => {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const submitButton = form.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputs, submitButton);

    inputs.forEach((input) => {
        input.addEventListener('input', function () {
            checkInputValidity(form, input);
            toggleButtonState(inputs, submitButton);
        });
    });
};

const checkInputValidity = (form, input) => {
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
    } else {
        hideInputError(form, input);
    }
};

const showInputError = (form, input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.add(settings.inputErrorClass);
    errorElement.classList.add(settings.errorMessage);
    errorElement.textContent = input.validationMessage;
};

const hideInputError = (form, input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorMessage);
    errorElement.textContent = "";
};

/*Вызов функции*/

enableValidation();