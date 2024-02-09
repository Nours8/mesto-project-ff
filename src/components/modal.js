export {
  openModal,
  closeEscape,
  closeOverlay,
  closeModal,
};

function openModal(popup) {
  popup.classList.add('popup_is-opened', 'popup_is-animated');
  document.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', closeEscape);
}


function closeEscape(evt) {
  if ((evt.key === 'Escape')) {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

function closeOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target);
  }
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', closeEscape);
}
