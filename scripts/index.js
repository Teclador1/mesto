import Card from "./Card.js";
import FormValdator from "./FormValdator.js";

//Откровенно говоря, я с очень большим трудом понимаю, как нужно выполнить ПР 7. Я с некоторым трудом понимаю ООП.
//Прошу вас, код-ревьюеры, помогите. Разъясните, как перенести переменные и функции в новые классы. 

/*Переменные*/

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const elementsPlace = document.querySelector('.elements__place');
const elementsPicture = document.querySelector('.elements__picture');

const allPopups = Array.from(document.querySelectorAll('.popup')); // Массив всех попапов в сайте
const popupEditProfile = document.querySelector('.popup_edit');
const popupAddCard = document.querySelector('.popup_add');
const popupShowPicture = document.querySelector('.popup_show');

const popupContainer = document.querySelector('.popup__container');

const formEditProfile = popupEditProfile.querySelector('#form-edit');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const professionInput = popupEditProfile.querySelector('.popup__input_type_profession');

const formAddCard = popupAddCard.querySelector('#form-add');
const placeInput = popupAddCard.querySelector('.popup__input_type_place');
const pictureInput = popupAddCard.querySelector('.popup__input_type_link');

const pictureInPopup = popupShowPicture.querySelector('.popup__picture');
const placeInPopup = popupShowPicture.querySelector('.popup__place');

const cardTemplate = document.querySelector('.template');
const elementsContainer = document.querySelector('.elements'); // Контейнер для карточек
const elementsCard = document.querySelector('.elements__card'); // Карточка

const buttonEditProfile = document.querySelector('.profile__pencil-button');
const buttonSaveProfile = document.querySelector('#save');
const buttonAddCard = document.querySelector('.profile__plus-button');
const buttonCreateCard = document.querySelector('#create');
const buttonsClosePopup = document.querySelectorAll('.popup__button-close');

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-rectangle',
    inactiveButtonClass: 'popup__button-rectangle-disabled',
    inputErrorClass: 'popup__input_error',
    errorMessage: '.popup__span-error'
};

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

/*Функции*/

// Функция добавления карточек с помощью template

const render = () => {
    initialCards.forEach((initialCard) => {
        const cardItem = createCard(initialCard.name, initialCard.link); // Задаём данные, беря элементы из массива
        elementsContainer.append(cardItem); // Располагаем место для данных
    });
}

const createCard = (name, link) => {
    const cardItem = cardTemplate.content.cloneNode(true);
    const cardText = cardItem.querySelector(".elements__place");
    const cardPicture = cardItem.querySelector(".elements__picture");
    cardText.textContent = name;
    cardPicture.setAttribute('src', link);
    cardPicture.setAttribute('alt', name);

    cardPicture.addEventListener('click', function keepPopupShow() {
        openPopup(popupShowPicture);

        pictureInPopup.setAttribute('alt', name);
        pictureInPopup.setAttribute('src', link);
        placeInPopup.textContent = name;
    });

    setEventListeners(cardItem)

    return cardItem;
}

// Функции открытия и закрытия попапа

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithEsc);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupWithEsc);
}

const closePopupWithEsc = (popup) => {
    if (popup.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
      }
} // (popup.keyCode === 27) может быть альтернативой

const closePopupOnOverlay = (event) => {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
      }
}

// Функция удаления карточки

const deleteCard = (event) => {
    const remover = event.target.closest(".elements__card")
    remover.remove();
}

// Функция лайка

const putLike = (event) => {
    event.target.classList.toggle("elements__heart-button-active")
}

// submit-функция, отвечающая за сохранение данных профиля

const handleFormSaveSubmit = (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    closePopup(popupEditProfile);
}

// submit-функция, отвечающая за добавление новых карточек

const handleFormAddSubmit = (event) => {
    event.preventDefault();
    const adder = createCard(placeInput.value, pictureInput.value);
    elementsContainer.prepend(adder);
    closePopup(popupAddCard);
}

// Остальные функции

const keepPopupEditProfile = () => {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent; // 'nameInput' - название переменной инпута для имени человека, a 'value' - придание атрибуту value иного значения.
    professionInput.value = profileProfession.textContent;
    blockSubmitButton (buttonSaveProfile);
}

const keepPopupAddCard = () => {
    openPopup(popupAddCard);
    placeInput.value = ""; // В данной строке 'value' имеет значение пустой строки ввода (т. е. инпута).
    pictureInput.value = "";
    blockSubmitButton (buttonCreateCard);
}

const setEventListeners = (elementsCard) => {
    const buttonDeleteCard = elementsCard.querySelector('.elements__trashcan-button');
    buttonDeleteCard.addEventListener('click', deleteCard);

    const buttonLikeCard = elementsCard.querySelector('.elements__heart-button');
    buttonLikeCard.addEventListener('click', putLike);
}

/*Вызовы функций*/

render();

buttonEditProfile.addEventListener('click', keepPopupEditProfile);

buttonAddCard.addEventListener('click', keepPopupAddCard);

buttonsClosePopup.forEach((closer) => {
    const commonPopup = closer.closest(".popup");

    closer.addEventListener('click', function () {
        closePopup(commonPopup)
    });
});

allPopups.forEach((popup) => {
    popup.addEventListener('click', closePopupOnOverlay)
});

formEditProfile.addEventListener('submit', handleFormSaveSubmit); // 'submit' – для кнопок, которые имеют данный тип.

formAddCard.addEventListener('submit', handleFormAddSubmit);