/*Переменные*/
let edit = document.querySelector('#edit');
let popup = document.querySelector('.popup');
let closes = document.querySelector('#close');
let save = document.querySelector('#save');

let names = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__profession');

let form = document.querySelector('#form');
let nameInput = form.querySelector('#name');
let professionInput = form.querySelector('#profession');


//Функция открытия и закрытия попапа
function openClosePopup() {
    popup.classList.toggle('popup_opened');
}

// Функция редактирования данных
function formSubmitHandler(evt) {
    evt.preventDefault();
    names.textContent = nameInput.value;
    profession.textContent = professionInput.value;
    popup.classList.toggle('popup_opened');
}

/*Команды*/
edit.addEventListener('click', openClosePopup);
closes.addEventListener('click', openClosePopup);
save.addEventListener('click', formSubmitHandler);