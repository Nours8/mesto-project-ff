import {profileTitle, profileDescription, placesList, cardFullScreen, likes} from './index.js';
// import {createCard} from './components/card.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
export {editedProfile, userInformation, addNewCard}

const configRequests = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-5',
  headers: {
    authorization: 'b80897c0-4801-474e-8cbf-eb6181de840d',
    'Content-Type': 'application/json'
  }
}

const userInformation = () => {
  return fetch(`${configRequests.baseUrl}/users/me`, {
    headers: configRequests.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

const getCards = () => {
  return fetch(`${configRequests.baseUrl}/cards`, {
    headers: configRequests.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);

    })
}

let userId;

const promises = [userInformation(), getCards()];

Promise.all(promises)
  .then(([user, cardData]) => {
    userId = user._id;
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
    console.log(cardData);
    console.log(user);

  })
  .catch((error) => {
    console.log(error);
  });

function editedProfile(data) {
  fetch(`${configRequests.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: configRequests.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  });
}

function addNewCard(data) {
  fetch(`${configRequests.baseUrl}/cards`, {
    method: 'POST',
    headers: configRequests.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  });
}


// const likes = () => {
  // fetch(`${configRequests.baseUrl}/cards`, {
  //   method: 'GET',
  //   headers: configRequests.headers,
  //   })
  // .then((res) => {
  //   if (res.ok) {
  //     return res.json()
  //   }
  // })
  // .then((data) => {
  //   likes.textContent = data.map(card => card.likes.length);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
// }


