/*Переменные*/
let edit = document.querySelector('.profile__pencil-button');
let closes = document.querySelector('.popup__button-close');

let names = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__profession');

let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');
let nameInput = form.querySelector('.popup__input_type_name');
let professionInput = form.querySelector('.popup__input_type_profession');


//Функция открытия попапа и придания инпутам value (т. е. значения), написанного в profile 
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = names.textContent; // 'nameInput' - название переменной инпута для имени человека, a 'value' - придание атрибуту value иного значения.
    professionInput.value = profession.textContent;
}

//Функция закрытия попапа
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