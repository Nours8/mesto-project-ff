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

  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) closeButton.addEventListener('click', () => closeModal(popup));
}


function closeEscape(evt) {
  if ((evt.key === 'Escape') && (document.querySelector('.popup_is-opened'))) {
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




