import axios from 'axios';    

const URL = 'http://localhost:8000'
const getUser = async () => {
    try {
        const response = await axios.get(`${URL}/users`);
        // console.log("ข้อมูล:", response.data);
        populateTable(response.data.results)
    } catch (error) {
        if (error.response) {
            console.log(error.response)
        } else {
            console.log(error)
        }
    }
};

const deleteUser = async (id) => {
    try {
        const button = id.target
        const userID = button.dataset.userId

        if (confirm("จะลบผู้ใช้งานหรือไม")) {
            const response = await axios.delete(`${URL}/user/${userID}`)
            console.log(response)
            getUser()
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response)
        } else {
            console.log(error)
        }
    }
}


const addUser = async () => {
    try {
        const PopupModal = document.querySelector('#modal')
        const username = document.querySelector('#username')
        const password = document.querySelector('#password')
        const email = document.querySelector('#email')
        const phone = document.querySelector('#phone')
        const address = document.querySelector('#address')


        const response = await axios.post(`${URL}/user`, {
            username: username.value,
            password: password.value,
            email: password.value,
            phone: phone.value,
            address: address.value
        })

        PopupModal.classList.remove('block')
        PopupModal.classList.add('hidden')
        
        username.value = ''
        password.value = ''
        email.value = ''
        phone.value = ''
        address.value = ''

        getUser()

        console.log(response)
    } catch (error) {
        if (error.response) {
            console.log(error.response)
        } else {
            console.log(error)
        }
    }
}

const populateTable = (users) => {
    const tbody = document.querySelector('#tableBody')
    tbody.innerHTML = ''

    users.forEach(user => {
        const row = `
                <tr class="border border-b-1">
                    <td class="px-6 py-4 text-lg">${user.username}</td>
                    <td class="px-6 py-4">${user.email}</td>
                    <td class="px-6 py-4">${user.phone}</td>
                    <td class="px-6 py-4">${user.address}</td>
                    <td class="px-3 py-4 text-center">
                        <button class="bg-indigo-600 px-3 py-2 rounded-lg text-white hover:bg-indigo-400"  type="button">Edit</button>
                        <button class="btn-delete  bg-red-600 px-3 py-2 rounded-lg text-white hover:bg-red-400" data-user-id="${user.id}" type="button">Delete</button>
                    </td>
                </tr>
        `
        tbody.innerHTML += row
    });

}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#btn-addUser').addEventListener('click', addUser)
})

// เมื่อกดคลิก จะหา class ที่มีชื่อที่กำหนดไว้ 
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        // event จะได้ตำแหน่งมา <button class="btn-delete  bg-red-600 px-3 py-2 rounded-lg text-white hover:bg-red-400" data-user-id="${user.id}" type="button">Delete</button>
        deleteUser(event)
        // console.log(event.target)
    }
})


getUser()