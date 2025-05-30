const popupOpenAdd = document.querySelector('#popup-open-add')
const popupCloseAdd = document.querySelector('#popup-close-add')
const PopupModalAdd = document.querySelector('#modal-add-user')

const popupOpenUpdate =document.querySelector('popup-open-update')
const popupCloseUpdate = document.querySelector('#popup-close-update')
const PopupModalUpdate = document.querySelector('#modal-update-user')  

// Popup From Add User
popupOpenAdd.addEventListener('click', () => {
  PopupModalAdd.classList.remove('hidden')
  PopupModalAdd.classList.add("block")
})

popupCloseAdd.addEventListener('click', () => {
  PopupModalAdd.classList.remove('block')
  PopupModalAdd.classList.add('hidden')
})

// Popup Close From User 
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup-open-update')) {
    PopupModalUpdate.classList.remove('hidden')
    PopupModalUpdate.classList.add('block')
  }
  
})
popupCloseUpdate.addEventListener('click', () => {
  PopupModalUpdate.classList.remove('block')
  PopupModalUpdate.classList.add('hidden')
})
