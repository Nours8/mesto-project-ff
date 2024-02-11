export {createCard, deleteCard, likeCard };
import {cardTemplate} from '../index.js';
import {deleteRequest, addLike, removeLike} from '../api.js';

function createCard(cardData, deleteCard, likeCard, cardFullScreen, userInfo) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const buttonCardDelete = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likes = cardElement.querySelector('.number-of-likes');

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;

  cardImage.addEventListener('click', () => cardFullScreen(cardData.link, cardData.name));

  if (cardData.owner._id !== userInfo._id) {
    buttonCardDelete.style.display = 'none';
  } else {
    buttonCardDelete.addEventListener('click', () => {
      deleteCard(cardData._id, cardElement);
    })
  }

  likes.textContent = Object.keys(cardData.likes).length;

  likeButton.addEventListener('click', () => {
    likeCard(cardData._id, likes, likeButton)
  });

  cardData.likes.forEach((item) => {
    if (item._id === userInfo._id) {
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
