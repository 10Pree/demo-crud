document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#btn-add-user').addEventListener('click', createUser)
})

// เมื่อกดคลิก จะหา class ที่มีชื่อที่กำหนดไว้ 
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        // event จะได้ตำแหน่งมา <button class="btn-delete  bg-red-600 px-3 py-2 rounded-lg text-white hover:bg-red-400" data-user-id="${user.id}" type="button">Delete</button>
        deleteUser(event)
        // console.log(event.target)
    }
})
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup-open-update')) {
        readuser(event)
        
    }
})

document.addEventListener('click', (event) => {
    if (event.target.id === 'btn-update-user') {
        updateUser(event)
    }
})