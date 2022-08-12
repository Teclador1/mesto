/*Переменные*/
let edit = document.querySelector('.profile__pencil-button');
let closes = document.querySelector('.popup__button-close');

let names = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__profession');

let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');
let nameInput = form.querySelector('.popup__input_name');
let professionInput = form.querySelector('.popup__input_profession');


//Функции открытия и закрытия попапа
function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

// Функция редактирования данных
function formSubmitHandler(evt) {
    evt.preventDefault();
    names.textContent = nameInput.value;
    profession.textContent = professionInput.value;
    closePopup();
}

/*Команды*/
edit.addEventListener('click', openPopup);
closes.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler); //'submit' – для кнопки "Сохранить", которая имеет данный тип.