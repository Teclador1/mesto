export class FormValidator {
    constructor (inputs, submitButton) {
        this._inputs = inputs;
        this._submitButton = submitButton;
    }

    _hasInvalidInput = (inputs) => {
        return inputs.some((input) => {
            return !input.validity.valid;
        });
    }
    
    _toggleButtonState = (inputs, submitButton) => {
        if (hasInvalidInput(inputs)) {
            blockSubmitButton (submitButton)
        } else {
            unblockSubmitButton (submitButton)
        }
    }
    
    _blockSubmitButton = (submitButton) => {
        submitButton.setAttribute('disabled', true)
        submitButton.classList.add(settings.inactiveButtonClass);
        submitButton.classList.remove('popup__button-rectangle');
    }
    
    _unblockSubmitButton = (submitButton) => {
        submitButton.removeAttribute('disabled')
        submitButton.classList.add('popup__button-rectangle');
        submitButton.classList.remove(settings.inactiveButtonClass);
    }
    
    _enableValidation = () => {
        const forms = Array.from(document.querySelectorAll(settings.formSelector));
        forms.forEach((form) => {
            form.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
    
            setValidationEventListeners(form);
        });
    };
    
    _setValidationEventListeners = (form) => {
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
    
    _checkInputValidity = (form, input) => {
        if (!input.validity.valid) {
            showInputError(form, input, input.validationMessage);
        } else {
            hideInputError(form, input);
        }
    };
    
    _showInputError = (form, input) => {
        const errorElement = form.querySelector(`#${input.id}-error`);
        input.classList.add(settings.inputErrorClass);
        errorElement.classList.add(settings.errorMessage);
        errorElement.textContent = input.validationMessage;
    };
    
    _hideInputError = (form, input) => {
        const errorElement = form.querySelector(`#${input.id}-error`);
        input.classList.remove(settings.inputErrorClass);
        errorElement.classList.remove(settings.errorMessage);
        errorElement.textContent = "";
    };
    
    /*Вызов функции*/
    
    enableValidation();
}

