import './api.js';
import './pages/index.css';
import {createCard, deleteCard, likeCard } from './components/card.js';
import {openModal, closeModal, } from './components/modal.js';
import {clearValidation, enableValidation} from './components/validation.js'
import {editedProfile, userInformation, addNewCard, getCards, editAvatar} from './api.js';
export {cardFullScreen, cardTemplate}

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// попап открытия картинки
const popupImage = document.querySelector('.popup_type_image');
// кнопка закрытия картинки
const btnCloseImage = popupImage.querySelector('.popup__close');


// попап обновить аватар
const popupEditImg = document.querySelector('.popup_edit_image');
// кнопка закрыитя обновить аватар
const btnCloseEditImg = popupEditImg.querySelector('.popup__close')
// кнопка открытия обновление аватара
const btnEditImg = document.querySelector('.profile__edit-button__image');
// форма обновить аватар
const popupEditImgElement = document.querySelector('form[name="edit-avatar"]');
// инпут формы - ссылка
const linkAvatarInput = popupEditImgElement.elements['update-avatar'];


// попап редактор профиля
const popupEdit = document.querySelector('.popup_type_edit');
// кнопка изменения профиля
const profileEditButton = document.querySelector('.profile__edit-button');
// кнопка закрытия редактор профиля
const btnCloseEdit = popupEdit.querySelector('.popup__close');
// форма редактор профиля
const profileFormElement = popupEdit.querySelector('.popup__form');
// инпут формы - имя
const profileNameInput = profileFormElement.elements.name;
// инпут формы - занятие
const profileJobInput = profileFormElement.elements.description;
// имя
const profileTitle = document.querySelector('.profile__title');
// занятие
const profileDescription = document.querySelector('.profile__description');


// попап новое место
const popupNewCard = document.querySelector('.popup_type_new-card');
// кнопка добавить место
const profileAddButtonNewPlace = document.querySelector('.profile__add-button');
// кнопка закрытия новое место
const btnCloseNewCard = popupNewCard.querySelector('.popup__close');
// форма новое место
const newPlaceFormElement = popupNewCard.querySelector('.popup__form');
// инпут формы - название
const placeNameInput = newPlaceFormElement.elements['place-name'];
// инпут формы - ссылка
const linkInput = newPlaceFormElement.elements.link;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

// объект ключей user
let userInfo;

//слушатель кнопки добавить место
profileAddButtonNewPlace.addEventListener('click', function () {
  openModal(popupNewCard);
  clearValidation(popupNewCard, validationConfig);
});

// слушатель кнопки открытия обновление аватара
btnEditImg.addEventListener('click', function () {
  openModal(popupEditImg);
  clearValidation(popupEditImg, validationConfig);
})

// слушатель кнопки изменения профиля
profileEditButton.addEventListener('click', function () {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  clearValidation(popupEdit, validationConfig);
  openModal(popupEdit);
});

// слушатель кнопки закрыитя обновить аватар
btnCloseEditImg.addEventListener('click', function () {
  closeModal(popupEditImg);
});

// слушатель кнопки закрытия картинки
btnCloseImage.addEventListener('click', function () {
  closeModal(popupImage);
});

// слушатель кнопки закрытия редактор профиля
btnCloseEdit.addEventListener('click', function () {
  closeModal(popupEdit);
});

// слушатель кнопки закрытия новое место
btnCloseNewCard.addEventListener('click', function () {
  closeModal(popupNewCard);
});

// слушатель формы обновить аватар
popupEditImgElement.addEventListener('submit', avatarUpdateForm);

// слушатель формы новое место
newPlaceFormElement.addEventListener('submit', handleNewCardFormSubmit);

// слушатель формы редактор профиля
profileFormElement.addEventListener('submit', profileEditingForm);

function cardFullScreen(link, name) {
  const img = popupImage.querySelector('.popup__image');
  img.src = link;
  img.alt = name;
  openModal(popupImage);
}

function avatarUpdateForm(evt) {
  evt.preventDefault();

  const linkAvatarValue = linkAvatarInput.value;

  editAvatar(linkAvatarValue)
  .then((res) => {
    document.querySelector('.profile__image').style.backgroundImage = `url(${res.avatar})`;
  })

  closeModal(popupEditImg);
  popupEditImgElement.reset()
}

// форма создания карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = placeNameInput.value;
  const linkValue = linkInput.value;

  addNewCard({
    name: nameValue,
    link: linkValue
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  })
  .then((res) => {
    console.log(res);
    newPlaceFormElement.querySelector('.popup__button').textContent = 'Сохранение...';
    placesList.prepend(createCard(
      res,
      deleteCard,
      likeCard,
      cardFullScreen,
      userInfo
      ))
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })

  newPlaceFormElement.reset()
  closeModal(popupNewCard);
}

// форма редактирования профиля
function profileEditingForm(evt) {
  evt.preventDefault();

  const nameValue = profileNameInput.value;
  const jobValue = profileJobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  editedProfile({
    name: profileNameInput.value,
    about: profileJobInput.value
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  })
  .then((res) => {
    console.log(res)
    popupEdit.querySelector('.popup__button').textContent = 'Сохранение...';
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  newPlaceFormElement.reset()
  closeModal(popupEdit);
}

const promises = [userInformation(), getCards()];

Promise.all(promises)
  .then(([user, cardData]) => {
    userInfo = user
    cardData.forEach(function (cardData) {
      placesList.append(createCard(
        cardData,
        deleteCard,
        likeCard,
        cardFullScreen,
        userInfo
        ));
    });
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    console.log(cardData);
    console.log(user);
    document.querySelector('.profile__image').style.backgroundImage = `url(${user.avatar})`;

  })
  .catch((error) => {
    console.log(error);
  });

  // enableValidation(validationConfig);
