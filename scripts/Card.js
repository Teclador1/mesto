export class Card {
    static _template = document.querySelector(".template").content;

    constructor (data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }
        _chaseTemplate = () => {
            const card = document.querySelector(this._templateSelector)
            .content.querySelector('.elements__card')
            .cloneNode(true);

            return card;
        }

        createCard = () => {
            this._card = this._chaseTemplate();
            this._setEventListeners();

            this._card.querySelector('.elements__picture').alt = this._name;
            this._card.querySelector('.elements__picture').src = this._link;
            this._card.querySelector('.elements__place').textContent = this._name;

            return this._card;
        }

        _setEventListeners = () => {
            this._card.querySelector('.elements__heart-button').addEventListener('click', () => {
                this._putLike();
            })

            this._card.querySelector('.elements__trashcan-button').addEventListener('click', () => {
                this._deleteCard();
            })
        }

        render = () => {
            initialCards.forEach((initialCard) => {
                this._card = createCard(initialCard.name, initialCard.link); // Задаём данные, беря элементы из массива
                elementsContainer.append(_card); // Располагаем место для данных
            });
        }
}