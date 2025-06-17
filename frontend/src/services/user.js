import axios from 'axios';
import { checkToken } from '../middlewares/auth';
import { populateTable } from '../js/userTable'
const URL = import.meta.env.VITE_URL_API;

// if(!Auth('/login.html')){
//     throw new Error("Not authenticated")
// }

const createUser = async () => {
    try {
        // เช็ค token 
        await checkToken()
        if (!checkToken()) {
            return
        }
        // ข้อมูล ที่ต้องกรอก จาก Form
        const PopupModal = document.querySelector('#modal-add-user')
        const username = document.querySelector('#add-username')
        const password = document.querySelector('#add-password')
        const email = document.querySelector('#add-email')
        const phone = document.querySelector('#add-phone')
        const address = document.querySelector('#add-address')


        // API
        const response = await axios.post(`${URL}/user`, {
            // ข้อมูลที่ได้จาก Form
            username: username.value,
            password: password.value,
            email: email.value,
            phone: phone.value,
            address: address.value
        }, {
            withCredentials: true
        })

        // ปิด Popup
        PopupModal.classList.remove('block')
        PopupModal.classList.add('hidden')

        // ล้าง From
        username.value = ''
        password.value = ''
        email.value = ''
        phone.value = ''
        address.value = ''

        // รี เห็น ข้อมูลใหม่
        readUsers()

    } catch (error) {
        if (error.response) {
            console.log(error.response)
        } else {
            console.log(error)
        }
    }
}

const readUsers = async () => {
    try {
        // API
        await checkToken()
        if (!checkToken()) {
            return
        }
        const response = await axios.get(`${URL}/users`, {
            withCredentials: true
        });
        // ส่งข้อมูลไป แสดง Table
        populateTable(response.data.Userdata)
    } catch (error) {
        if (error.response) {
            console.log(error.response)
        } else {
            console.log(error)
        }
    }
};

const readuser = async (event) => {
    try {
        // เช็ค token 
        await checkToken()
        if (!checkToken()) {
            return
        }
        // นำ id มา จาก data-user-id จาก button
        const userId = event.target.dataset.userId
        // value ข้อมูลจาก Form
        const username = document.querySelector('#update-username')
        const email = document.querySelector('#update-email')
        const phone = document.querySelector('#update-phone')
        const address = document.querySelector('#update-address')
        const button = document.querySelector('#btn-update-user')

        // API
        const response = await axios.get(`${URL}/user/${userId}`, {
            withCredentials: true
        })
        console.log(response.data.Userdata)
        const DataUser = response.data.Userdata[0]
        username.value = DataUser.username
        email.value = DataUser.email
        phone.value = DataUser.phone
        address.value = DataUser.address
        button.dataset.userId = DataUser.id

    } catch (error) {
        if (error.response) {
            console.log(error.response)
        } else {
            console.log(error)
        }
    }

}

const updateUser = async (id) => {
    try {
        // เช็ค token 
        await checkToken()
        if (!checkToken()) {
            return
        }
        // นำ id มา จาก data-user-id จาก button
        const userID = id.target.dataset.userId
        // value ข้อมูลจาก Form
        const username = document.querySelector('#update-username').value
        const password = document.querySelector('#update-password').value
        const email = document.querySelector('#update-email').value
        const phone = document.querySelector('#update-phone').value
        const address = document.querySelector('#update-address').value
        const PopupModal = document.querySelector('#modal-update-user')

        // API
        const response = await axios.put(`${URL}/user/${userID}`, {
            // ข้อมูลที่ส่งไป
            username,
            password,
            email,
            phone,
            address
        }, {
            withCredentials: true
        })
        // ปิด Popup
        PopupModal.classList.remove('block')
        PopupModal.classList.add('hidden')
        // รี แสดง ข้อมูล ใหม่
        readUsers()
    } catch (error) {
        if (error.response) {
            console.log(error.response)
        } else {
            console.log(error)
        }
    }
}

const deleteUser = async (id) => {
    try {
        // เช็ค token 
        await checkToken()
        if (!checkToken()) {
            return
        }
        // นำ id มา จาก data-user-id จาก button
        const userID = id.target.dataset.userId

        if (confirm("จะลบผู้ใช้งานหรือไม")) {
            // API
            const response = await axios.delete(`${URL}/user/${userID}`, {
                withCredentials: true
            })
            // console.log(response.data.resutls)
            // รี แสดง ข้อมูล ใหม่
            readUsers()
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response)
        } else {
            console.log(error)
        }
    }
}

readUsers()

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