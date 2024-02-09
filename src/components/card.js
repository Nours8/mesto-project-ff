export {createCard, deleteCard, likeCard };
import {cardTemplate} from '../index.js';

function createCard(cardData, remove, likeCard, cardFullScreen, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonCardDelete = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likes = cardElement.querySelector('.number-of-likes');

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;

  buttonCardDelete.addEventListener('click', remove);
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => cardFullScreen(cardData.link, cardData.name));
  likes.textContent = Object.keys(cardData.likes).length;
  // likes.textContent = cardData.likes.length;

  if (cardData.owner._id !== userId) {
    buttonCardDelete.style.display = 'none';
  }

  return cardElement;
}

function deleteCard(evt) {
  const removeCard = evt.target.closest('.card');
  removeCard.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}



