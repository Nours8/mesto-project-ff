import './pages/index.css';
import {createCard, deleteCard, likeCard } from './components/card.js';
import {openModal, closeModal, } from './components/modal.js';
import {clearValidation, enableValidation} from './components/validation.js'
import {editedProfile, getUserInformation, addNewCard, getCards, editAvatar} from './components/api.js';
export {cardFullScreen, cardTemplate, checkResponse}

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

//  cardFullScreen
const img = popupImage.querySelector('.popup__image');
const imgCaption = popupImage.querySelector('.popup__caption');

// avatarUpdateForm
const profile = document.querySelector('.profile')
const imgAvatar = profile.querySelector('.profile__image')

// проверка запроса
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

let userId;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const promises = [getUserInformation(), getCards()];

Promise.all(promises)
  .then(([user, cardData]) => {
    userId = user._id
    cardData.forEach(function (cardData) {
      placesList.append(createCard(
        cardData,
        deleteCard,
        likeCard,
        cardFullScreen,
        userId
        ));
    });
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    imgAvatar.style.backgroundImage = `url(${user.avatar})`;

  })
  .catch((error) => {
    console.log(error);
  });

enableValidation(validationConfig);

function cardFullScreen(link, name) {
  imgCaption.textContent = name;
  img.src = link;
  img.alt = name;
  openModal(popupImage);
}

function avatarUpdateForm(evt) {
  evt.preventDefault();

  const linkAvatarValue = linkAvatarInput.value;
  popupEditImgElement.querySelector('.popup__button').textContent = 'Сохранение...';
  editAvatar(linkAvatarValue)
  .then((res) => {
    imgAvatar.style.backgroundImage = `url(${res.avatar})`;
    closeModal(popupEditImg);
    popupEditImgElement.reset()
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    popupEditImgElement.querySelector('.popup__button').textContent = 'Сохранить';
  })
}

// форма создания карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = placeNameInput.value;
  const linkValue = linkInput.value;
  newPlaceFormElement.querySelector('.popup__button').textContent = 'Сохранение...';

  addNewCard({
    name: nameValue,
    link: linkValue
  })
  .then((res) => {
    console.log(res);
    placesList.prepend(createCard(
      res,
      deleteCard,
      likeCard,
      cardFullScreen,
      userId
      ))
    newPlaceFormElement.reset()
    closeModal(popupNewCard);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    newPlaceFormElement.querySelector('.popup__button').textContent = 'Сохранить';
  })
}

// форма редактирования профиля
function profileEditingForm(evt) {
  evt.preventDefault();

  const nameValue = profileNameInput.value;
  const jobValue = profileJobInput.value;

  popupEdit.querySelector('.popup__button').textContent = 'Сохранение...';
  editedProfile({
    name: profileNameInput.value,
    about: profileJobInput.value
  })
  .then((res) => {
    // console.log(res)

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;

    profileFormElement.reset()
    closeModal(popupEdit);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    popupEdit.querySelector('.popup__button').textContent = 'Сохранить';
  })
}

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

