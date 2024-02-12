export {createCard, deleteCard, likeCard };
import {cardTemplate} from '../index.js';
import {deleteRequest, addLike, removeLike} from './api.js';

function createCard(cardData, deleteCard, likeCard, cardFullScreen, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonCardDelete = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likes = cardElement.querySelector('.number-of-likes');

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;

  cardImage.addEventListener('click', () => cardFullScreen(cardData.link, cardData.name));

  if (cardData.owner._id !== userId) {
    buttonCardDelete.style.display = 'none';
  } else {
    buttonCardDelete.addEventListener('click', () => {
      deleteCard(cardData._id, cardElement);
    })
  }

  likes.textContent = cardData.likes.length;

  likeButton.addEventListener('click', () => {
    likeCard(cardData._id, likes, likeButton)
  });

  cardData.likes.forEach((item) => {
    if (item._id === userId) {
      likeButton.classList.add('card__like-button_is-active');
    } else {
      likeButton.classList.remove('card__like-button_is-active');
    }
  })

  return cardElement;
}

function deleteCard(cardId, card) {
  deleteRequest(cardId)
  .then(() => {
    card.remove()
  })
  .catch((err) => {
    console.log(err)
  })
}

function likeCard(id, likes, likeButton) {
  if (!(likeButton.classList.contains('card__like-button_is-active'))) {
    addLike(id)
      .then((cardData) => {
        likeButton.classList.add('card__like-button_is-active');
        likes.textContent = Object.keys(cardData.likes).length;
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    removeLike(id)
      .then((cardData) => {
        likeButton.classList.remove('card__like-button_is-active');
        likes.textContent = Object.keys(cardData.likes).length;
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
