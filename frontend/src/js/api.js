import axios from 'axios';    

const URL = 'http://localhost:8000'
const getUsers = async () => {
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

const getuser = async(id) =>{
    const userID = id.target.dataset.userId
    const username = document.querySelector('#update-username')
    const password = document.querySelector('#update-password')
    const email = document.querySelector('#update-email')
    const phone = document.querySelector('#update-phone')
    const address = document.querySelector('#update-address')

    const response = await axios.get(`${URL}/user/${userID}`)
    // showDateUser()   
    const DataUser = response.data.results[0]
    username.value = DataUser.username
    // password.value = DataUser.password
    email.value = DataUser.email
    phone.value = DataUser.phone
    address.value = DataUser.address

}

const deleteUser = async (id) => {
    try {
        // const button = id.target
        const userID = id.target.dataset.userId

        if (confirm("จะลบผู้ใช้งานหรือไม")) {
            const response = await axios.delete(`${URL}/user/${userID}`)
            console.log(response.data.resutls)
            getUsers()
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
        const PopupModal = document.querySelector('#modal-add-user')
        const username = document.querySelector('#add-username')
        const password = document.querySelector('#add-password')
        const email = document.querySelector('#add-email')
        const phone = document.querySelector('#add-phone')
        const address = document.querySelector('#add-address')


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

        getUsers()

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
                        <button class="popup-open-update bg-indigo-600 px-3 py-2 rounded-lg text-white hover:bg-indigo-400" data-user-id="${user.id}"  type="button">Edit</button>
                        <button class="btn-delete  bg-red-600 px-3 py-2 rounded-lg text-white hover:bg-red-400" data-user-id="${user.id}" type="button">Delete</button>
                    </td>
                </tr>
        `
        tbody.innerHTML += row
    });

}

// const showDateUser = (userdata) => {
//     const fromData = document.querySelector('#modal-update-user')
//     fromData.innerHTML = ''

//     userdata.forEach(user => {
//         const row = `
//                     <div class="h-full flex justify-center items-center">
//             <div class="max-w-md bg-white shadow-xl p-10 text-ms rounded-2xl">
//                 <div class="flex justify-end">
//                     <svg id="popup-close-update" class=" cursor-pointer" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
//                         width="20" height="20" viewBox="0 0 30 30">
//                         <path
//                             d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z">
//                         </path>
//                     </svg>
//                 </div>
//                 <h3 class="uppercase text-center font-bold text-2xl">UpdateUser</h3>
//                 <form class="my-5">
//                     <div class="grid gap-5 grid-cols-2 text-lg">
//                         <div class="col-span-2">
//                             <label class="">Username</label>
//                             <input id="update-username" class="block w-full h-10 p-2 bg-gray-200 rounded-lg outline-indigo-500" type="text"
//                                 placeholder="Non1234" autocomplete="new-username" value="${user.username}">
//                         </div>
//                         <div class="">
//                             <label>Password</label>
//                             <input id="update-password" class="block w-full h-10 p-2 bg-gray-200 rounded-lg outline-indigo-500"
//                                 type="password" placeholder="N24@ie1" autocomplete="new-password" value="${user.password}">
//                         </div>
//                         <div>
//                             <label>email</label>
//                             <input id="update-email" class="block w-full h-10 p-2 bg-gray-200 rounded-lg outline-indigo-500" type="email"
//                                 placeholder="Non@gmail.com" value="${user.email}">
//                         </div>
//                                                 <div>
//                             <label>phone</label>
//                             <input id="update-phone" class="block w-full h-10 p-2 bg-gray-200 rounded-lg outline-indigo-500" type="number"
//                                 placeholder="097-98070345" value="${user.phone}">
//                         </div>
//                         <div class="col-span-2">
//                             <label>address</label>
//                             <textarea class="block w-full h-20 p-2 bg-gray-200 rounded-lg outline-indigo-500"
//                                 name="address" id="update-address" placeholder="2/7 m...." value="${user.address}"></textarea>
//                         </div>
//                         <button id="btn-update-user" class="col-span-2 bg-indigo-500 h-10 rounded-lg text-white uppercase font-bold hover:bg-indigo-100 hover:text-indigo-500"
//                             type="button">Update</button>
//                 </form>
//             </div>
//         </div>
//         `
//         fromData.innerHTML += row
//     });

// }

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#btn-add-user').addEventListener('click', addUser)
})

// เมื่อกดคลิก จะหา class ที่มีชื่อที่กำหนดไว้ 
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        // event จะได้ตำแหน่งมา <button class="btn-delete  bg-red-600 px-3 py-2 rounded-lg text-white hover:bg-red-400" data-user-id="${user.id}" type="button">Delete</button>
        deleteUser(event)
        // console.log(event.target)
    }
})
// document.querySelector('btn-update-user').addEventListener('click', getuser)
document.addEventListener('click', (event) =>{
    if(event.target.classList.contains('popup-open-update')){
        getuser(event)
    }
})


getUsers()