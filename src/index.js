import './api.js';
import '../pages/index.css';
import {createCard, deleteCard, likeCard } from './components/card.js';
import {openModal, closeModal, } from './components/modal.js';
import {clearValidation, enableValidation} from './components/validation.js'
import {editedProfile, userInformation, addNewCard} from './api.js';
export {cardFullScreen, cardTemplate, profileTitle, profileDescription, placesList}

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupImage = document.querySelector('.popup_type_image');
const btnCloseImage = popupImage.querySelector('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const btnCloseEdit = popupEdit.querySelector('.popup__close');
const popupNewCard = document.querySelector('.popup_type_new-card');
const btnCloseNewCard = popupNewCard.querySelector('.popup__close');
const newPlaceFormElement = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = newPlaceFormElement.elements['place-name'];
const linkInput = newPlaceFormElement.elements.link;

const profileFormElement = document.querySelector('.popup__form');
const profileNameInput = profileFormElement.elements.name;
const profileJobInput = profileFormElement.elements.description;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

profileEditButton.addEventListener('click', function () {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  clearValidation(popupEdit, config);
  openModal(popupEdit);
});

btnCloseImage.addEventListener('click', function () {
  closeModal(popupImage);
});

btnCloseEdit.addEventListener('click', function () {
  closeModal(popupEdit);
});

btnCloseNewCard.addEventListener('click', function () {
  closeModal(popupNewCard);
});

profileAddButton.addEventListener('click', function () {
  openModal(popupNewCard);
  clearValidation(popupNewCard, config);
});

newPlaceFormElement.addEventListener('submit', handleNewCardFormSubmit);

profileFormElement.addEventListener('submit', profileEditingForm);

function cardFullScreen(link, name) {
  const img = popupImage.querySelector('.popup__image');
  img.src = link;
  img.alt = name;
  openModal(popupImage);
}

// форма создания карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = placeNameInput.value;
  const linkValue = linkInput.value;

  // const newCard = createCard(
  //   { name: nameValue, link: linkValue },
  //   deleteCard,
  //   likeCard,
  //   cardFullScreen,
  //   userId
  //   );

  // placesList.prepend(newCard);

  // addNewCard({
  //   name: nameValue,
  //   link: linkValue
  // })

  addNewCard(nameValue, linkValue)
    .then((card) => {
      const newCard = createCard(
        card.name,
        card.link,
        deleteCard,
        likeCard,
        cardFullScreen,
        userId
        );
    placesList.prepend(newCard);

  })

  newPlaceFormElement.reset();
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
  });
  userInformation()
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
      console.log(profile);
    })
    .catch((err) => {
      console.log(err)
    });
  closeModal(popupEdit);
}

enableValidation(config);
