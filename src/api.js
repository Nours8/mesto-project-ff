export {
  editedProfile,
  userInformation,
  addNewCard,
  getCards,
  deleteRequest,
  addLike,
  removeLike,
  editAvatar
}

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

function editedProfile(data) {
  return fetch(`${configRequests.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: configRequests.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  });
}

function addNewCard(data) {
  return fetch(`${configRequests.baseUrl}/cards`, {
    method: 'POST',
    headers: configRequests.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  });
}

function deleteRequest(cardId) {
  return fetch(`${configRequests.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: configRequests.headers,
    })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

function addLike(cardId) {
  return fetch(`${configRequests.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: configRequests.headers,
    })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

function removeLike(cardId) {
  return fetch(`${configRequests.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: configRequests.headers,
    })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

function editAvatar(link) {
  return fetch(`${configRequests.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: configRequests.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}
