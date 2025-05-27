const popupOpen = document.querySelector('#popup-open')
const popupClose = document.querySelector('#popup-close')
const PopupModal = document.querySelector('#modal')

popupOpen.addEventListener('click', () => {
  PopupModal.classList.remove('hidden')
  PopupModal.classList.add("block")
})

popupClose.addEventListener('click', () =>{
  PopupModal.classList.remove('block')
  PopupModal.classList.add('hidden')
})