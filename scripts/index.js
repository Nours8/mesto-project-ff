// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function addCard(name, link, remove) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__image').src = link;

  cardDelete.addEventListener('click', remove);

  return cardElement;
}

function deleteCard(evt) {
  const removeCard = evt.target.closest('.card');
  removeCard.remove();
}

for (let i = 0; i < initialCards.length; i++) {
  placesList.append(addCard(initialCards[i].name, initialCards[i].link, deleteCard))
}

