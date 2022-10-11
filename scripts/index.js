/*Переменные*/

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const elementsPlace = document.querySelector('.elements__place');
const elementsPicture = document.querySelector('.elements__picture');

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupShow = document.querySelector('.popup_show');

const formEdit = popupEdit.querySelector('#form-edit');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const professionInput = popupEdit.querySelector('.popup__input_type_profession');

const formAdd = popupAdd.querySelector('#form-add');
const placeInput = popupAdd.querySelector('.popup__input_type_place');
const pictureInput = popupAdd.querySelector('.popup__input_type_link');

const pictureInPopup = popupShow.querySelector('.popup__picture');
const placeInPopup = popupShow.querySelector('.popup__place');

const template = document.querySelector('.template');
const elementsContainer = document.querySelector('.elements'); // Контейнер для карточек

const elementsCard = document.querySelector('.elements__card');

const editProfileButton = document.querySelector('.profile__pencil-button');
const saveProfileButton = document.querySelector('#save');
const addCardButton = document.querySelector('.profile__plus-button');
const createCardButton = document.querySelector('#create');
const closePopupButton = document.querySelectorAll('.popup__button-close');

/*Функции*/

//Функция добавления карточек с помощью template
const render = () => {
    initialCards.forEach((initialCard) => {
        const cardItem = createCard(initialCard.name, initialCard.link); // Задаём данные, беря элементы из массива
        elementsContainer.append(cardItem); // Располагаем место для данных
    });
};

const createCard = (name, link) => {
    const cardItem = template.content.cloneNode(true);
    const cardText = cardItem.querySelector(".elements__place");
    const cardPicture = cardItem.querySelector(".elements__picture");
    cardText.textContent = name;
    cardPicture.setAttribute('src', link);
    cardPicture.setAttribute('alt', name);

    cardPicture.addEventListener('click', function keepPopupShow () {
        openPopup(popupShow);

        pictureInPopup.setAttribute('alt', name);
        pictureInPopup.setAttribute('src', link);
        placeInPopup.textContent = name;
    });

    setEventListeners(cardItem)

    return cardItem;
};

//Функция открытия попапа

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    console.log(popup);
}

//Функция закрытия попапа

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

//Функция сохранения данных профиля

const saveProfile = () => {
    formEdit.addEventListener('submit', handleFormSaveSubmit); //'submit' – для кнопки "Сохранить", которая имеет данный тип.
    closePopup(popupEdit);
}

//Функция добавления карточки

const addCard = () => {
    const adder = createCard(placeInput.value, pictureInput.value);
    elementsContainer.prepend(adder);
    placeInput.value = "";
    pictureInput.value = "";
    formAdd.addEventListener('submit', handleFormAddSubmit);
    closePopup(popupAdd);
}

//Функция удаления карточки

const deleteCard = (event) => {
    const remover = event.target.closest(".elements__card")
    remover.remove();
}

//Функция лайка

const putLike = (event) => {
    event.target.classList.toggle("elements__heart-button-active")
};

// Остальные функции

const keepPopupAdd = () => {
    openPopup(popupAdd);
}

const keepPopupEdit = () => {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent; // 'nameInput' - название переменной инпута для имени человека, a 'value' - придание атрибуту value иного значения.
    professionInput.value = profileProfession.textContent;
}

const setEventListeners = (elementsCard) => {
    const deleteCardButton = elementsCard.querySelector('.elements__trashcan-button');
    deleteCardButton.addEventListener('click', deleteCard);

    const likeCardButton = elementsCard.querySelector('.elements__heart-button');
    likeCardButton.addEventListener('click', putLike);
}

const handleFormSaveSubmit = (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
}

const handleFormAddSubmit = (event) => {
    event.preventDefault();
}

/*Вызовы функций*/

render();

editProfileButton.addEventListener('click', keepPopupEdit);

addCardButton.addEventListener('click', keepPopupAdd);

closePopupButton.forEach((closer) => {
    const allPopups = closer.closest(".popup");

    closer.addEventListener('click', function () {
        closePopup(allPopups)
    });
});

saveProfileButton.addEventListener('click', saveProfile)

createCardButton.addEventListener('click', addCard);