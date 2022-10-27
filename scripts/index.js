/*Переменные*/

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const elementsPlace = document.querySelector('.elements__place');
const elementsPicture = document.querySelector('.elements__picture');

const allPopups = document.querySelectorAll('.popup');
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
        openPopup(popupShow);

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
    popup.addEventListener("click", closePopupOnOverlay);
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

const closePopupOnOverlay = (popup) => {
    if (popup.target.closest(".popup")) {
        closePopup(popup.target);
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
}

const keepPopupAddCard = () => {
    openPopup(popupAddCard);
    placeInput.value = "";
    pictureInput.value = "";
    buttonCreateCard.setAttribute('disabled', true);
    buttonCreateCard.classList.add('popup__button-rectangle-disabled');
    buttonCreateCard.classList.remove('popup__button-rectangle');
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

formEditProfile.addEventListener('submit', handleFormSaveSubmit); // 'submit' – для кнопок, которые имеют данный тип.

formAddCard.addEventListener('submit', handleFormAddSubmit);