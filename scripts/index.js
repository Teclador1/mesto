/*Переменные*/
const editButton = document.querySelector('.profile__pencil-button');
const addButton = document.querySelector('.profile__plus-button');
const deleteButton = document.querySelector('.elements__trashcan-button');
const likeButton = document.querySelector('.elements__heart-button');
const closeButton = document.querySelector('.popup__button-close');
const saveButton = document.querySelector('#save');
const createButton = document.querySelector('#create');

const names = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');
const place = document.querySelector('.elements__place');
const picture = document.querySelector('.elements__picture');

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupShow = document.querySelector('#popup-show');

const form = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const professionInput = document.querySelector('.popup__input_type_profession');
const placeInput = document.querySelector('.popup__input_type_place');
const pictureInput = document.querySelector('.popup__input_type_link');

const pictureInPopup = document.querySelector('.popup__picture');
const figcaptionInPopup = document.querySelector('.popup__figcaption');

const template = document.querySelector('.template');
const elements = document.querySelector('.elements'); // Контейнер для карточек

const elementsCard = document.querySelector('.elements__card');

/*Массив с новыми местами*/
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

/*Новый скрипт*/

/* Прото-функции открытия и закрытия попапов
const openPopup = () => {
    popup.classList.add('popup_opened');
}

const closePopup = () => {
    popup.classList.remove('popup_opened');
}
*/

/*Функции*/

//Функция добавления карточек с помощью insertAdjacentHTML и её вызов

/*const render = () => {
    initialCards.forEach(card => {
        const item = `
        <article class="elements__card card">
        <button id="remove" class="elements__trashcan-button" type="button"></button>
        <img src="${card.link}" alt="${card.name}" class="elements__picture">
        <div class="elements__rectangle">
            <h2 class="elements__place">${card.name}</h2>
            <button class="elements__heart-button" type="button"></button>
        </div>
        </article>
        `
        elements.insertAdjacentHTML('afterbegin', item)
    })
}

render()*/

//Функция добавления карточек с помощью template

const render = () => {
    initialCards.forEach((initialCard) => {
        const cardItem = createCard(initialCard.name, initialCard.link); //Задаём данные, беря элементы из массива
        elements.append(cardItem); //Располагаем место для данных

        createButton.addEventListener('click', addCard);
    });
};

const createCard = (name, link) => {
    const cardItem = template.content.cloneNode(true);
    const cardText = cardItem.querySelector(".elements__place");
    cardText.textContent = name;
    const cardPicture = cardItem.querySelector(".elements__picture");
    cardPicture.setAttribute('src', link);
    cardPicture.setAttribute('alt', name);

    cardPicture.addEventListener('click', function () {
        popupShow.classList.add('popup_opened');

        const closeButton = popupShow.querySelector('.popup__button-close')
        closeButton.addEventListener('click', function () {
            popupShow.classList.remove('popup_opened');
        })

        const pictureInPopup = popupShow.querySelector('.popup__picture');
        const figcaptionInPopup = popupShow.querySelector('.popup__figcaption');

        pictureInPopup.setAttribute('src', link);
        figcaptionInPopup.textContent = ('alt', name);
    }); // Тело функции popupShowData внутри функции createCard

    setEventListeners(cardItem)

    return cardItem;
};

//Функция добавления карточки

const addCard = () => {
    const add = createCard(placeInput.value, pictureInput.value);
    elements.prepend(add);
    placeInput.value = "";
    pictureInput.value = "";
    popupAdd.classList.remove('popup_opened');
    e.preventDefault();
}

//Функция удаления карточки

const deleteCard = (evt) => {
    const dlte = evt.target.closest(".elements__card")
    dlte.remove();
}

//Функция лайка

const putLike = (evt) => {
    evt.target.classList.toggle("elements__heart-button-active")
};

const popupEditData = () => {
    popupEdit.classList.add('popup_opened');

    nameInput.value = names.textContent; // 'nameInput' - название переменной инпута для имени человека, a 'value' - придание атрибуту value иного значения.
    professionInput.value = profession.textContent;

    const closeButton = popupEdit.querySelector('.popup__button-close')
    closeButton.addEventListener('click', function () {
        popupEdit.classList.remove('popup_opened');
    })

    const saveButton = popupEdit.querySelector('#save')
    saveButton.addEventListener('click', function () {
        form.addEventListener('submit', formSubmitHandler); //'submit' – для кнопки "Сохранить", которая имеет данный тип.
        popupEdit.classList.remove('popup_opened');
    })
}

const popupAddData = () => {
    popupAdd.classList.add('popup_opened');

    const closeButton = popupAdd.querySelector('.popup__button-close')
    closeButton.addEventListener('click', function () {
        popupAdd.classList.remove('popup_opened');
    })
}

const setEventListeners = (cardItem) => {
    const deleteButton = cardItem.querySelector('.elements__trashcan-button')
    deleteButton.addEventListener('click', deleteCard);

    const likeButton = cardItem.querySelector('.elements__heart-button')
    likeButton.addEventListener('click', putLike);
}

/* const popupShowData = (cardItem) => {
    popupShow.classList.add('popup_opened');

    const closeButton = popupShow.querySelector('.popup__button-close')
    closeButton.addEventListener('click', function () {
        popupShow.classList.remove('popup_opened');
    })

    const picture = cardItem.querySelector('.elements__picture');

    const place = cardItem.querySelector('.elements__place');

    const pictureInPopup = popupShow.querySelector('.popup__picture');
    const figcaptionInPopup = popupShow.querySelector('.popup__figcaption');

    pictureInPopup.setAttribute('src', link);
    figcaptionInPopup.textContent = ('alt', name);
} */

const formSubmitHandler = (evt) => {
    evt.preventDefault();
    names.textContent = nameInput.value; // 'nameInput' - название переменной инпута для имени человека, a 'value' - придание атрибуту value иного значения.
    profession.textContent = professionInput.value;
}

//Вызовы функций

render();

editButton.addEventListener('click', popupEditData);

addButton.addEventListener('click', popupAddData);

//picture.addEventListener('click', popupShowData)